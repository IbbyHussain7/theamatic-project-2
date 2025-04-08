const socket = io();
//const canvas = document.getElementById("game-board");
//const ctx = canvas.getContext("2d");

let players = {};
let roomCode = null;
let turn = 0;
function addNotification(message) {
    const box = document.getElementById("notification-box");
    const msg = document.createElement("div");
    msg.className = "notification";
    msg.textContent = message;
    box.appendChild(msg);
  
    // Scroll to bottom
    box.scrollTop = box.scrollHeight;
  }
// Join room when clicking "Join Game"
document.getElementById("join-room").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    let inputRoomCode = document.getElementById("roomCode").value.trim().toUpperCase();

    if (!username) {
        alert("Please enter a name!");
        return;
    }

    socket.emit("joinRoom", { username, roomCode: inputRoomCode });
});

document.getElementById("turn-end").addEventListener("click", () => {
    console.log(turn);
    socket.emit("turn-end", {turn});
});
socket.on("nextTurn",(newTurn) => {
    turn = newTurn;
    console.log("new turn for "+ turn);
} );

const form1 = document.getElementById("suggest");

  form1.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload

    const player = document.getElementById("player-select").value.trim();
    const room = document.getElementById("room-input").value.trim();
    const item = document.getElementById("item-input").value.trim();

    const data = {
      player,
      room,
      item
    };

    socket.emit("suggest", data);
  });
  const form2 = document.getElementById("accuse");

  form2.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload

    const player = document.getElementById("player-select").value.trim();
    const room = document.getElementById("room-input").value.trim();
    const item = document.getElementById("item-input").value.trim();

    const data = {
      player,
      room,
      item
    };

    socket.emit("accuse", data);
  });


// Handle joining a room
socket.on("roomJoined", (data) => {
    roomCode = data.roomCode;
    players = data.players;
    document.getElementById("display-room").innerHTML = "Room: "+ roomCode;
    console.log(`Joined room: ${roomCode}`);
    draw();
});

// Handle new players joining
socket.on("playerJoined", (data) => {
    players[data.id] = data.player;
    //addNotification(`${data.player.username} has joined the game!`);
    draw();
});


// Handle player leaving
socket.on("playerLeft", (id) => {
    delete players[id];
    draw();
});
socket.on("notification", (message) => {
    const box = document.getElementById("notification-box");
    const msg = document.createElement("div");
    msg.className = "notification";
    msg.textContent = message;
    box.appendChild(msg);
  
    // Auto-scroll to bottom
    box.scrollTop = box.scrollHeight;
  });

// Draw players on the canvas
function draw() {
}