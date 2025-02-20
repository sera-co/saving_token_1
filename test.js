const { encrypt, decrypt } = require("./script");

// Sample payload
const payload = { userId: 123, role: "admin" };

// Encrypt the payload
const encryptedToken = encrypt(payload);
console.log("Encrypted JWT:", encryptedToken);

// Decrypt and verify the token
const decodedPayload = decrypt(encryptedToken);
console.log("Decoded Payload:", decodedPayload);

// Check if the function works correctly
if (decodedPayload) {
  console.log("Success: JWT verified!");
} else {
  console.log("Failed: Invalid JWT.");
}
