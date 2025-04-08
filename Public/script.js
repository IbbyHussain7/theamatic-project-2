let deductionId = 0;

function addDeduction() {
    const character = document.getElementById('character-input').value;
    const weapon = document.getElementById('weapon-input').value;
    const room = document.getElementById('room-input').value;
    const notes = document.getElementById('notes-input').value;

    deductionId++;
    const rowId = `deduction-${deductionId}`;

    const table = document.getElementById('deductions-table');
    const row = table.insertRow();
    row.id = rowId;
    row.insertCell(0).innerText = character;
    row.insertCell(1).innerText = weapon;
    row.insertCell(2).innerText = room;
    row.insertCell(3).innerText = notes;
    row.insertCell(4).innerHTML = `<button onclick="removeDeduction('${rowId}')">Remove</button>`;

    document.getElementById('character-input').value = '';
    document.getElementById('weapon-input').value = '';
    document.getElementById('room-input').value = '';
    document.getElementById('notes-input').value = '';
}

function removeDeduction(rowId) {
    const row = document.getElementById(rowId);
    row.parentNode.removeChild(row);
}

function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').innerText = `You rolled a ${result}!`;
}

// Helper function to add scripts dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            console.log(`${src} loaded!`);
            resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
    });
}
async function loadScripts() {
    try {
        await loadScript("/socket.io/socket.io.js");
        await loadScript("js/game.js");
        console.log("All scripts loaded!");
    } catch (error) {
        console.error(error);
    }
}

function startOnlineGame() {
    alert("Starting a new game online...");
    document.body.innerHTML = `
    <div class="header">
        <div class="logo">
            <img id="logoimg" src="images/logo.png" alt="Logo image cannot be loaded" width="50px" height="auto">
        </div>
        <div class="heading">
            <h1 class="heading1">Cluedo Game Companion - Online Game</h1>
        </div>
        <div class="dropdown">
            <button class="dropbtn">Menu</button>
            <div class="dropdown-content">
                <a href="index.html">Home</a>
                <a href="instruction.html">Instructions</a>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Game Lobby</h2>
        <h3 id="display-room">Room: [no room]<h3>
        <p>Players connected:</p>
        <ul id="player-list">
            <li>Player 1 (You)</li>
            <!-- Additional players will be added dynamically -->
        </ul>
        <input type="text" id="username" placeholder="Enter your name" required>
        <input type="text" id="roomCode" placeholder="Enter room code (or leave empty to create)">
        <button id="join-room">Connect to Online Game</button>
    </div>

    <div class="section">
        <h2>Game Events</h2>
        <div class="container2">
        <div id="notification-box"></div>
        </div>
    </div>

    <div class="section">
        <h2>Dice Roll</h2>
        <button onclick="rollDice()">Roll Dice</button>
        <p id="dice-result">Roll the dice to see your result.</p>
        <h2>End Turn</h2>
        <button id="turn-end">End turn</button>
        <h2>Suggest</h2>
<form id="suggest">
  <label>
    Select Player:
    <select id="player-select">
      <option value="Rev. Green">Rev. Green</option>
      <option value="Col. Mustard">Col. Mustard</option>
      <option value="Mrs Peacock">Mrs Peacock</option>
      <option value="Prof. Plum">Prof. Plum</option>
      <option value="Miss Scarlett">Miss Scarlett</option>
      <option value="Mrs White">Mrs White</option>
    </select>
  </label>
  <br />

  <label>
    Item:
    <select id="item-input">
        <option value="Spanner">Spanner</option>
      <option value="Candle Stick">Candle Stick</option>
      <option value="Revolver">Revolver</option>
      <option value="Lead Piping">Lead Piping</option>
      <option value="Dagger">Dagger</option>
      <option value="Rope">Rope</option>
    </select>
  </label>
  <br />

  <label>
    Room:
    <select id="room-input">
       <option value="Kitchen">Kitchen</option>
      <option value="Hall">Hall</option>
      <option value="Billiard Room">Billiard Room</option>
      <option value="Lounge">Lounge</option>
      <option value="Study">Study</option>
      <option value="Library">Library</option>
      <option value="Conservatory">Conservatory</option>
      <option value="Dining Room">Dining Room</option>
      <option value="Ballroom">Ballroom</option>
    </select>
  </label>
  </label>
  <br />

  <button type="submit">Suggest</button>
</form>
        <h2>Accuse</h2>
<form id="accuse">
  <label>
    Select Player:
    <select id="player-select">
      <option value="Rev. Green">Rev. Green</option>
      <option value="Col. Mustard">Col. Mustard</option>
      <option value="Mrs Peacock">Mrs Peacock</option>
      <option value="Prof. Plum">Prof. Plum</option>
      <option value="Miss Scarlett">Miss Scarlett</option>
      <option value="Mrs White">Mrs White</option>
    </select>
  </label>
  <br />

  <label>
    Item:
    <select id="item-input">
        <option value="Spanner">Spanner</option>
      <option value="Candle Stick">Candle Stick</option>
      <option value="Revolver">Revolver</option>
      <option value="Lead Piping">Lead Piping</option>
      <option value="Dagger">Dagger</option>
      <option value="Rope">Rope</option>
    </select>
  </label>
  <br />

  <label>
    Room:
    <select id="room-input">
       <option value="Kitchen">Kitchen</option>
      <option value="Hall">Hall</option>
      <option value="Billiard Room">Billiard Room</option>
      <option value="Lounge">Lounge</option>
      <option value="Study">Study</option>
      <option value="Library">Library</option>
      <option value="Conservatory">Conservatory</option>
      <option value="Dining Room">Dining Room</option>
      <option value="Ballroom">Ballroom</option>
    </select>
  </label>
  </label>
  <br />

  <button type="submit">Suggest</button>
</form>
    </div>

    <div class="section">
        <h2>Deduction Tracker</h2>
        <table>
            <thead>
                <tr>
                    <th>Character</th>
                    <th>Weapon</th>
                    <th>Room</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody id="deductions-table">
                <tr id="input-row">
                    <td><input type="text" id="character-input"></td>
                    <td><input type="text" id="weapon-input"></td>
                    <td><input type="text" id="room-input"></td>
                    <td><input type="text" id="notes-input"></td>
                </tr>
            </tbody>
        </table>
        <button onclick="addDeduction()">Add Deduction</button>
    </div>

    <div class="section">
        <h2>Game Chat</h2>
        <textarea id="chat-box" rows="10" cols="50" readonly></textarea>
        <br>
        <input type="text" id="chat-input" placeholder="Type your message here">
        <button onclick="sendMessage()">Send</button>
    </div>
    `;
    loadScripts();
}


function connectToOnlineGame() {
    alert("Connecting to the online game...");
    // Add logic to connect to an online game server
}

function sendMessage() {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value;

    if (message.trim() !== '') {
        chatBox.value += `You: ${message}\n`;
        chatInput.value = '';
    }
}

function startOfflineGame() {
    document.body.innerHTML = `
<div class="header">
    <div class="logo">
      <img id="logoimg" src="images/logo.png" alt="Logo image cannot be loaded" width="50px" height="auto">
    </div>
    <div class="heading">
      <h1 class="heading1">Cluedo Game Companion</h1>
    </div>
    <div class="dropdown">
      <button class="dropbtn">Dropdown</button>
      <div class="dropdown-content">
        <a href="index.html">Home</a>
        <a href="instruction.html">Instructions</a>
      </div>
    </div>
  </div>

    <div class="section">
        <h2>Dice Roll</h2>
        <button onclick="rollDice()">Roll Dice</button>
        <p id="dice-result">Roll the dice to see your result.</p>
    </div>

    <div class="section">
        <h2>Score Sheet</h2>
        <table class="score-sheet">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Rev. Green</th>
                    <th>Col. Mustard</th>
                    <th>Mrs Peacock</th>
                    <th>Prof. Plum</th>
                    <th>Miss Scarlett</th>
                    <th>Mrs White</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Spanner</td>
                    <td><input type="checkbox" id="green-spanner"></td>
                    <td><input type="checkbox" id="mustard-spanner"></td>
                    <td><input type="checkbox" id="peacock-spanner"></td>
                    <td><input type="checkbox" id="plum-spanner"></td>
                    <td><input type="checkbox" id="scarlett-spanner"></td>
                    <td><input type="checkbox" id="white-spanner"></td>
                </tr>
                <tr>
                    <td>Candle Stick</td>
                    <td><input type="checkbox" id="green-candle"></td>
                    <td><input type="checkbox" id="mustard-candle"></td>
                    <td><input type="checkbox" id="peacock-candle"></td>
                    <td><input type="checkbox" id="plum-candle"></td>
                    <td><input type="checkbox" id="scarlett-candle"></td>
                    <td><input type="checkbox" id="white-candle"></td>
                </tr>
                <tr>
                    <td>Revolver</td>
                    <td><input type="checkbox" id="green-revolver"></td>
                    <td><input type="checkbox" id="mustard-revolver"></td>
                    <td><input type="checkbox" id="peacock-revolver"></td>
                    <td><input type="checkbox" id="plum-revolver"></td>
                    <td><input type="checkbox" id="scarlett-revolver"></td>
                    <td><input type="checkbox" id="white-revolver"></td>
                </tr>
                <tr>
                    <td>Lead Piping</td>
                    <td><input type="checkbox" id="green-piping"></td>
                    <td><input type="checkbox" id="mustard-piping"></td>
                    <td><input type="checkbox" id="peacock-piping"></td>
                    <td><input type="checkbox" id="plum-piping"></td>
                    <td><input type="checkbox" id="scarlett-piping"></td>
                    <td><input type="checkbox" id="white-piping"></td>
                </tr>
                <tr>
                    <td>Dagger</td>
                    <td><input type="checkbox" id="green-dagger"></td>
                    <td><input type="checkbox" id="mustard-dagger"></td>
                    <td><input type="checkbox" id="peacock-dagger"></td>
                    <td><input type="checkbox" id="plum-dagger"></td>
                    <td><input type="checkbox" id="scarlett-dagger"></td>
                    <td><input type="checkbox" id="white-dagger"></td>
                </tr>
                <tr>
                    <td>Rope</td>
                    <td><input type="checkbox" id="green-rope"></td>
                    <td><input type="checkbox" id="mustard-rope"></td>
                    <td><input type="checkbox" id="peacock-rope"></td>
                    <td><input type="checkbox" id="plum-rope"></td>
                    <td><input type="checkbox" id="scarlett-rope"></td>
                    <td><input type="checkbox" id="white-rope"></td>
                </tr>
                <tr>
                    <td>Kitchen</td>
                    <td><input type="checkbox" id="green-kitchen"></td>
                    <td><input type="checkbox" id="mustard-kitchen"></td>
                    <td><input type="checkbox" id="peacock-kitchen"></td>
                    <td><input type="checkbox" id="plum-kitchen"></td>
                    <td><input type="checkbox" id="scarlett-kitchen"></td>
                    <td><input type="checkbox" id="white-kitchen"></td>
                </tr>
                <tr>
                    <td>Hall</td>
                    <td><input type="checkbox" id="green-hall"></td>
                    <td><input type="checkbox" id="mustard-hall"></td>
                    <td><input type="checkbox" id="peacock-hall"></td>
                    <td><input type="checkbox" id="plum-hall"></td>
                    <td><input type="checkbox" id="scarlett-hall"></td>
                    <td><input type="checkbox" id="white-hall"></td>
                </tr>
                <tr>
                    <td>Billiard Room</td>
                    <td><input type="checkbox" id="green-billiard"></td>
                    <td><input type="checkbox" id="mustard-billiard"></td>
                    <td><input type="checkbox" id="peacock-billiard"></td>
                    <td><input type="checkbox" id="plum-billiard"></td>
                    <td><input type="checkbox" id="scarlett-billiard"></td>
                    <td><input type="checkbox" id="white-billiard"></td>
                </tr>
                <tr>
                    <td>Lounge</td>
                    <td><input type="checkbox" id="green-lounge"></td>
                    <td><input type="checkbox" id="mustard-lounge"></td>
                    <td><input type="checkbox" id="peacock-lounge"></td>
                    <td><input type="checkbox" id="plum-lounge"></td>
                    <td><input type="checkbox" id="scarlett-lounge"></td>
                    <td><input type="checkbox" id="white-lounge"></td>
                </tr>
                <tr>
                    <td>Study</td>
                    <td><input type="checkbox" id="green-study"></td>
                    <td><input type="checkbox" id="mustard-study"></td>
                    <td><input type="checkbox" id="peacock-study"></td>
                    <td><input type="checkbox" id="plum-study"></td>
                    <td><input type="checkbox" id="scarlett-study"></td>
                    <td><input type="checkbox" id="white-study"></td>
                </tr>
                <tr>
                    <td>Library</td>
                    <td><input type="checkbox" id="green-library"></td>
                    <td><input type="checkbox" id="mustard-library"></td>
                    <td><input type="checkbox" id="peacock-library"></td>
                    <td><input type="checkbox" id="plum-library"></td>
                    <td><input type="checkbox" id="scarlett-library"></td>
                    <td><input type="checkbox" id="white-library"></td>
                </tr>
                <tr>
                    <td>Conservatory</td>
                    <td><input type="checkbox" id="green-conservatory"></td>
                    <td><input type="checkbox" id="mustard-conservatory"></td>
                    <td><input type="checkbox" id="peacock-conservatory"></td>
                    <td><input type="checkbox" id="plum-conservatory"></td>
                    <td><input type="checkbox" id="scarlett-conservatory"></td>
                    <td><input type="checkbox" id="white-conservatory"></td>
                </tr>
                <tr>
                    <td>Dining Room</td>
                    <td><input type="checkbox" id="green-dining"></td>
                    <td><input type="checkbox" id="mustard-dining"></td>
                    <td><input type="checkbox" id="peacock-dining"></td>
                    <td><input type="checkbox" id="plum-dining"></td>
                    <td><input type="checkbox" id="scarlett-dining"></td>
                    <td><input type="checkbox" id="white-dining"></td>
                </tr>
                <tr>
                    <td>Ballroom</td>
                    <td><input type="checkbox" id="green-ballroom"></td>
                    <td><input type="checkbox" id="mustard-ballroom"></td>
                    <td><input type="checkbox" id="peacock-ballroom"></td>
                    <td><input type="checkbox" id="plum-ballroom"></td>
                    <td><input type="checkbox" id="scarlett-ballroom"></td>
                    <td><input type="checkbox" id="white-ballroom"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Track Your Deductions</h2>
        <table>
            <thead>
                <tr>
                    <th>Character</th>
                    <th>Weapon</th>
                    <th>Room</th>
                    <th>Notes</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="deductions-table">
                <tr id="input-row">
                    <td><input type="text" id="character-input"></td>
                    <td><input type="text" id="weapon-input"></td>
                    <td><input type="text" id="room-input"></td>
                    <td><input type="text" id="notes-input"></td>
                    <td><button onclick="addDeduction()">Add Deduction</button></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Characters</h2>
        <ul id="characters-list">
            <li>Miss Scarlett</li>
            <li>Colonel Mustard</li>
            <li>Mrs. White</li>
            <li>Reverend Green</li>
            <li>Mrs. Peacock</li>
            <li>Professor Plum</li>
        </ul>
    </div>

    <div class="section">
        <h2>Rooms</h2>
        <ul id="rooms-list">
            <li>Kitchen</li>
            <li>Ballroom</li>
            <li>Conservatory</li>
            <li>Dining Room</li>
            <li>Billiard Room</li>
            <li>Library</li>
            <li>Lounge</li>
            <li>Hall</li>
            <li>Study</li>
        </ul>
    </div>

    <div class="section">
        <h2>Weapons</h2>
        <ul id="weapons-list">
            <li>Candlestick</li>
            <li>Dagger</li>
            <li>Lead Pipe</li>
            <li>Revolver</li>
            <li>Rope</li>
            <li>Wrench</li>
        </ul>
    </div>

    <div class="section">
        <h2>Game Setup</h2>
        <ol>
            <li>Place all characters, weapons, and rooms on the board.</li>
            <li>Shuffle the character, weapon, and room cards separately.</li>
            <li>Draw one card from each deck and place them in the confidential case file.</li>
            <li>Shuffle the remaining cards together and deal them to the players.</li>
        </ol>
    </div>

    <div class="section">
        <h2>Gameplay Mechanics</h2>
        <ol>
            <li>Players take turns moving their characters around the board.</li>
            <li>On each turn, a player can make a suggestion about the murder.</li>
            <li>Other players must try to disprove the suggestion by showing a card.</li>
            <li>Players can make an accusation if they think they know the solution.</li>
        </ol>
    </div>

    <div class="section">
        <h2>Strategy Tips</h2>
        <ul>
            <li>Pay attention to the cards shown by other players.</li>
            <li>Use process of elimination to narrow down the possibilities.</li>
            <li>Bluff to mislead other players about your deductions.</li>
        </ul>
    </div>

    <div class="section">
        <h2>Frequently Asked Questions</h2>
        <ul>
            <li><strong>Q:</strong> How do I make a suggestion?<br><strong>A:</strong> Move your character to a room and
                suggest a character, weapon, and room.</li>
            <li><strong>Q:</strong> What happens if my suggestion is disproved?<br><strong>A:</strong> The player who
                disproves your suggestion shows you one card that matches your suggestion.</li>
            <li><strong>Q:</strong> Can I make an accusation at any time?<br><strong>A:</strong> Yes, but if your
                accusation is incorrect, you are out of the game.</li>
        </ul>
    </div>

    <div class="section">
        <h2>Glossary</h2>
        <ul>
            <li><strong>Suggestion:</strong> A guess about the character, weapon, and room involved in the murder.</li>
            <li><strong>Accusation:</strong> A final guess about the character, weapon, and room. If correct, you win
                the game.</li>
            <li><strong>Disprove:</strong> Showing a card to prove a suggestion is incorrect.</li>
        </ul>
    </div>
    `;
}