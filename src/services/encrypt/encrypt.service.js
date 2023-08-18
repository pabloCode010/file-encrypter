const crypto = require("crypto");
const path = require("path");

class Encrypt {
  constructor() {}
  encryptedFile(filePath) {
    const algorithm = "aes-256-cbc";
    const key = crypto.randomBytes(32); // Clave secreta
    const iv = crypto.randomBytes(16); // Vector de inicialización
    const { base, name, ext } = path.parse(filePath);

    const data = fs.readFileSync(filePath); // Leer el archivo

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]); // Contenido del archivo encriptado
    fs.writeFileSync(`${name}.enc`, encryptedData);
    fs.writeFileSync(`key-${base}.key`, key);
    fs.writeFileSync(`iv-${base}.iv`, iv);
  }
  decryptedFile(filePath, iv, key, ext){
    const { name } = path.parse(filePath);
    const data = fs.readFileSync(filePath); // Leer el archivo

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decryptedData = Buffer.concat([decipher.update(data), decipher.final()]);
    fs.writeFileSync(`${name}-decrypted${ext}`, decryptedData);
  }
}

module.exports = new Encrypt();