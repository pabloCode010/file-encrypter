const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Clave secreta
const iv = crypto.randomBytes(16); // Vector de inicialización

const file = "files/file.pdf";
const { name, ext } = path.parse(file)

const text = fs.readFileSync(file);

const cipher = crypto.createCipheriv(algorithm, key, iv);
const encryptedData = Buffer.concat([cipher.update(text), cipher.final()]);

fs.writeFileSync(`${name}.enc`, encryptedData);

const encryptedFile = fs.readFileSync(`${name}.enc`);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
const decryptedData = Buffer.concat([decipher.update(encryptedFile), decipher.final()]);

fs.writeFileSync(`${name}-decrypted${ext}`, decryptedData);
