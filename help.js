const rules = require("./gamerule");
var { AsciiTable3 } = require("ascii-table3");
function getTable(moves) {
  
  let movesNumber = moves.length;
    var table = new AsciiTable3();
    
    var matrix = [];

    for (var curr_item = 0; curr_item < movesNumber; curr_item++) {
      var row = [moves[curr_item]];
      
      for (var j = 0; j < movesNumber; j++) {
        row.push(rules.getResult(movesNumber, curr_item, j));
        }
        
      matrix.push(row);
    }
    

    table
        .setHeading(' ', ...moves)
        .addRowMatrix(matrix);

    return table;
}

module.exports = { getTable };
