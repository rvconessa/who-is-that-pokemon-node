const crypto = require('crypto');
const { encryptionConfig } = require('../config')

const encrypt = (text) => {
    let cipher = crypto.createCipher(encryptionConfig.algorithm, encryptionConfig.hash)
    let crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}
   
const decrypt = (text) => {
    let decipher = crypto.createDecipher(encryptionConfig.algorithm, encryptionConfig.hash)
    let dec = decipher.update(text, 'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

module.exports = { encrypt, decrypt };