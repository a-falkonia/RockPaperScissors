var { AsciiTable3 } = require("ascii-table3");

function getTable(rpsGame) {
  
  var table = new AsciiTable3();

    table
        .setHeading(' ', ...rpsGame.moves)
        .addRowMatrix(rpsGame.rulesTable);

    return table;
}

module.exports = { getTable };
