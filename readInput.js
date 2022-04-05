const readline = require("readline");

const readInput = (question) => {
  return new Promise((res, err) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (a) => {
      rl.close();
      res(a);
    });
  });
};

module.exports = readInput;
