function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class rpsGame {
  moves;
  computerMove;
  secretKey;
  HMAC;

  rulesTable;

  menu() {
    console.log("\nAvailable moves: ");

    this.moves.forEach(element, (ind) => {
      console.log(`${ind + 1} - ${element}`);
    });
    console.log("0 - exit");
    console.log("? - help");
  }

  setMoves() {
    const moveSet = process.argv.slice(2);
    if (this.isValid(moveSet)) {
      this.moves = moveSet;
    } else process.exit();
  }

  setComputerMove() {
    let computerMove = getRandomIntInclusive(0, movesNumber - 1);
    this.computerMove = computerMove;
  }

  getResult(yourMove, computerMove) {
    let len = this.moves.length;

    if (yourMove == computerMove) {
      return "Draw";
    } else if (computerMove > yourMove) {
      if (computerMove - yourMove < len / 2) {
        return "You Lose";
      }
      return "You Win!";
    } else if (yourMove - computerMove < len / 2) {
      return "You Win!";
    }
    return "You Lose";
  }

  isValid(moveset) {
    if (moveset.length < 3) {
      console.log("Not enough moves to play (min.3)");
      return false;
    }
    if (moveset.length % 2 != 1) {
      console.log("Please, enter an odd amount of moves");
      return false;
    }

    if (
      moveset.some((move, ind, movearr) => {
        if (ind != movearr.length) return movearr.includes(move, index + 1);
      })
    ) {
      console.log("Moves must be unique. Please, try again");
      return false;
    }
    return true;
    }
    
    setRulesTable() {
        let table = [];

        for (let i = 0; i < this.moves.length; i++){

            // Name of the current move
            let row = [this.moves[i]];

            // Win / Lose / Draw with other moves
            for (let j = 0; j < this.moves.length; j++){
                switch (this.getResult(i, j)) {
                    case 'Draw': row.push('Draw');
                    case 'You Lose': row.push('Lose');
                    case 'You Win': row.push('Win');
                }
            }

            table.push(row);
        }
        this.rulesTable = table;
    }
}


module.exports = rpsGame;