//Imports Express.js, a lightweight web framework for handling HTTP requests and serving static files
const express = require("express");// makes setting up the web server easier
//Loads Node.js's built-in HTTP module, which is required to create a server.
const http = require("http");
//Imports the Socket.IO server module, which enables real-time, bidirectional communication between the server and clients.
const { Server } = require("socket.io");
//creates an Express app instance, this is the core web server that will handle HTTP requests.
const app = express();
//wraps the Express app inside an HTTP server, allowing it to handle both static content via express and websocket communication
const server = http.createServer(app);
//Creates a new Socket.IO server instance attached to the HTTP server.
const io = new Server(server);

app.use(express.static("public")); // Serve static files

const rooms = {}; // { roomCode: { playerId: { name, position } } }
const users = {};
// Generate a random 4-letter room code
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", ({ username, roomCode }) => {
        // Create a new room if no code is provided
        if (!roomCode) {
            roomCode = generateRoomCode();
        }

        // Ensure the room exists
        if (!rooms[roomCode]) {
            rooms[roomCode] = {};
            currentTurn = 0;
        }

        // Store player in the room
        rooms[roomCode][socket.id] = {
            name: username,
            num: io.sockets.adapter.rooms.get(roomCode)?.size || 0
        };
        console.log(rooms[roomCode][socket.id].num);
        users[socket.id] = username;
        socket.join(roomCode);
        socket.roomCode = roomCode;

        console.log(`${username} joined room ${roomCode}`);
        // Broadcast notification to everyone in the room
        io.to(roomCode).emit("notification", `${username} joined the room`);
        // Send room details to the player
        socket.emit("roomJoined", { roomCode, players: rooms[roomCode] });

        // Notify other players in the room
        socket.to(roomCode).emit("playerJoined", { id: socket.id, player: rooms[roomCode][socket.id] });

        // Handle player movement


        socket.on("ready", () => {

        })

        socket.on("suggest", (data) => {
            console.log(`Received form data:`, data);

            // Example: send confirmation back
            socket.emit("notification", `${username} suggested ${data.player} with ${data.item} in ${data.room}`);
        });
        socket.on("accuse", (data) => {
            console.log(`Received form data:`, data);

            // Example: send confirmation back
            socket.emit("notification", `${username} accused ${data.player} with ${data.item} in ${data.room}`);
        });

        socket.on("turn-end", ({ turn }) => {

            if (currentTurn == rooms[roomCode][socket.id].num) {

                let newTurn = turn + 1;
                newTurn = newTurn % (io.sockets.adapter.rooms.get(roomCode)?.size || 0);
                io.to(socket.roomCode).emit("nextTurn", newTurn);
                console.log("new turn for " + newTurn);
                let targetSocketId = null;

                for (const id in rooms[roomCode]) {
                    if (rooms[roomCode][id].num === newTurn) {
                        targetSocketId = id;
                        break; // Stop once found
                    }
                }
                io.to(socket.roomCode).emit("notification", `${users[targetSocketId]}'s turn`);
                currentTurn = newTurn;
            }
        });
        // Handle disconnection
        socket.on("disconnect", () => {
            if (rooms[roomCode]) {
                delete rooms[roomCode][socket.id];
                socket.to(roomCode).emit("playerLeft", socket.id);
                if (Object.keys(rooms[roomCode]).length === 0) {
                    delete rooms[roomCode]; // Remove empty room
                }
            }
        });
    });
    // socket.on("turn-end", ({ turn }) => {
    //     players = io.sockets.adapter.rooms.get(socket.roomCode);
    //     if (players[currentTurn] == players[turn]) {

    //         let newTurn = turn + 1;
    //         newTurn = newTurn % players.size;
    //         io.to(socket.roomCode).emit("nextTurn", newTurn);
    //         console.log("new turn for " + newTurn);
    //         io.to(socket.roomCode).emit("notification", `${users[socket.id]}'s turn`);
    //         currentTurn = newTurn;
    //     }
    // });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});