const prompt = require("prompt-sync")();
const help = require("./help");
const SecretKey = require("./secret-key.js");
const SecureMsg = require("./HMAC.js");
const rules = require("./gamerule");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let moves = process.argv.slice(2);

let options = new Map();
moves.forEach((move, index) => {
  options.set(index + 1, move);
});
options.set(0, "exit");
options.set("?", "help");

// Computer decides on its move
let movesNumber = moves.length;

let computerMove = getRandomIntInclusive(0, movesNumber-1);
console.log("\nDEBUGGING; Computer move:", computerMove);

const secretKey = new SecretKey();
let moveKey = secretKey.create();
console.log("DEBUGGING; Secret key: ", moveKey);

const msg = new SecureMsg();
msg.createHMAC(moveKey, computerMove.toString());

let moveHMAC = msg.hmac;
console.log("HMAC: ", moveHMAC);

// Player chsoses their move

console.log("\nAvailable moves: ");

for (const [key, value] of options.entries()) {
  console.log(key, "-", value);
}

const playerMove = prompt("\nEnter your move: ");
switch (playerMove) {
  case "?": {
    console.log(help.getTable(moves).toString());
    //TODO: вернуться в главное меню!
  }
  case "0": {
    process.exit();
  }
}

//Showing the game result
let gamestatus = rules.getResult(movesNumber, computerMove, playerMove - 1);
console.log("Computer move:", moves[computerMove])
console.log(gamestatus);


