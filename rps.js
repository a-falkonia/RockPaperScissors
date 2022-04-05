const help = require("./help");
const SecretKey = require("./secret-key.js");
const SecureMsg = require("./HMAC.js");

const readInput = require("./readInput");
const rpsGame = require("./game-mechanics.js");


const rps = new rpsGame();
const secret = new SecretKey();
const securemsg = new SecureMsg();

rps.setMoves();
rps.setRulesTable();

gameSequence();

function gameSequence() {
  
  console.log('\nGame start!');

  rps.setComputerMove();
  rps.secretKey = secret.create();
  securemsg.createHMAC(rps.secretKey, rps.computerMove.toString());

  rps.hmac = securemsg.hmac;
  
  console.log('HMAC: ', rps.hmac);

  rps.menu();

  interface();
}

async function interface() {
  const ans = await readInput('Choose your move: ');

  // Processing user input
  if (((ans >= 0) && (ans < rps.moves.length)) || ans == '?') {
    switch (ans) {
      case '?':
                console.log(help.getTable(rps).toString());
                interface();
                break;
      case '0':
                process.exit();
        
      default: {
        
        console.log('Your move: ', rps.moves[ans - 1]);
        console.log('Computer move: ', rps.moves[rps.computerMove]);

        // Game mechanics: anouncing the winner

        console.log("You", rps.getResult((ans - 1), rps.computerMove));
        // Showing the secret key
        console.log('Secret key of the move:', rps.secretKey);
        
        // Option to play again
        const playagain = await readInput('Do you wat to play again? (yes/no): ');

        if (playagain == 'yes') {
          gameSequence();
          break;
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


