require("dotenv").config();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");


const SECRET_KEY = process.env.SECRET_KEY;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!SECRET_KEY || !ENCRYPTION_KEY) {
  throw new Error("Missing SECRET_KEY or ENCRYPTION_KEY in .env file");
}
const encrypt = (payload) => {
  // encrypt the payload and return token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const encryptedToken = CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();

  return encryptedToken;
}

const decrypt = (encryptedToken) => {
  // return decoded payload
  try {

    const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

 
    return jwt.verify(decryptedToken, SECRET_KEY);
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    return null;
  }
}

module.exports = {
  encrypt,
  decrypt
}
