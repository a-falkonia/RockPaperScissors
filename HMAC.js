const { createHmac } = require("crypto");
class SecureMsg {
  hmac;

  createHMAC(key, message) {
    const hmac = createHmac("sha256", key);
    hmac.update(message);
    this.hmac = hmac.digest('hex');
  }
}

module.exports = SecureMsg;
