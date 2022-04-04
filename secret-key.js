const secureRandom = require("secure-random");

class SecretKey {
  create() {
    return secureRandom.randomBuffer(32).toString('hex')}
}

module.exports = SecretKey;