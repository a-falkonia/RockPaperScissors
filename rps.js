const help = require("./help");
const SecretKey = require("./secret-key.js");
const SecureMsg = require("./HMAC.js");

const readInput = require("./readInput");
const rpsGame = require("./game-mechanics.js");


const rpsGame = new rpsGame();
const secret = new SecretKey();
const securemsg = new SecureMsg();

rpsGame.setMoves();
rpsGame.setRulesTable();

gameSequence();

function gameSequence() {
  
  console.log('Game start!');

  rpsGame.setComputerMove();
  rpsGame.secretKey = secret.create();
  rpsGame.hmac = securemsg.createHMAC(rpsGame.secretKey, rpsGame.computerMove);

  console.log('HMAC: ', rpsGame.hmac);

  rpsGame.menu();

  interface();
}

function interface() {
  const ans = await readInput('Choose your move: ');

  // Processing user input
  if ((ans >= 0) && (ans < rpsGame.moves.length || ans == '?')) {
    switch (ans) {
      case '?':
                console.log(help.getTable(rpsGame).toString());
                interface();
                break;
      case '0':
                process.exit();
        
      default: {
        
        console.log('Your move: ', rpsGame.moves[ans - 1]);
        console.log('Computer move: ', rpsGame.moves[rpsGame.computerMove]);
        // Game mechanics: defining the winner
        console.log(rpsGame.getResult((ans - 1), computerMove));
        // Showing the secret key
        console.log('Secret key of the move:', rpsGame.secretKey);
        
        // Option to play again
        const playagain = await readInput('Do you wat to play again? (yes/no): ');

        if (playagain == 'yes') {
          gameSequence();
        } else if (playagain == 'no') {
          break;
        }
      }
    }
    
  }
  else {
    console.log("Incorrect command. Please, try again")
    interface();
  }
}


