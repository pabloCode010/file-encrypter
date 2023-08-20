const crypto = require("crypto");
const path = require("path");
const fs = require('fs');

class Encrypt {
  constructor() {
    this.algorithm = "aes-256-cbc";
  }
  encryptedFile(filePath) {
    const key = crypto.randomBytes(32); // Clave secreta
    const iv = crypto.randomBytes(16); // Vector de inicialización
    const data = fs.readFileSync(filePath); // Leer el archivo

    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]); // Contenido encriptado
    return [encryptedData, key, iv];
  }
  decryptedFile(filePath, key, iv){
    const data = fs.readFileSync(filePath); // Leer el archivo
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    const decryptedData = Buffer.concat([decipher.update(data), decipher.final()]);
    return decryptedData;
  }
}

module.exports = new Encrypt();