const yargs = require('yargs');
const path = require('path');
const fs = require('fs');

const Encrypt = require("../../services/encrypt/encrypt.service");

yargs.command({
  command: 'encrypt',
  describe: 'Encriptar Archivos',
  builder: {
    path: {
      describe: 'Ruta Al Archivo',
      type: 'string',
      demandOption: "Se Necesita La Ruta Al Archivo"
    }
  },
  handler: (argv) => {
    const processCwd = process.cwd();
    if(!path.isAbsolute(argv.path)){
      argv.path = path.join(processCwd, argv.path);
    }
    if(!fs.existsSync(argv.path)){  
      throw new Error("No Existe");
    }
    console.log("File", argv.path);
    const { name } = path.parse(argv.path);
    const savePath = path.join(processCwd, `${name}-enc`);
    fs.mkdirSync(savePath);
    const [ encryptedData, key, iv ] = Encrypt.encryptedFile(argv.path);
    fs.writeFileSync(path.join(savePath, `${name}.enc`), encryptedData);
    fs.writeFileSync(path.join(savePath, `${name}.key`), key);
    fs.writeFileSync(path.join(savePath, `${name}.iv`), iv);
  }
});