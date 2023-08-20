const yargs = require("yargs");
const path = require("path");
const fs = require("fs");

const Encrypt = require("../services/encrypt.service");
const { red, yellow } = require("colorette");

const func = (argv) => {
  const processCwd = process.cwd();// devuelve la ruta desde donde se ejecuta el programa
  if (!path.isAbsolute(argv.path)) {
    argv.path = path.join(processCwd, argv.path);// se concatena la ruta desde donde se ejecuto, con la ruta pasada como argumento
  }
  if (!fs.existsSync(argv.path)) {
    throw new Error("No Existe");
  }
  console.log("File:", yellow(argv.path));
  const { name, ext } = path.parse(argv.path); // se extrae el nombre y extensión del archivo
  const savePath = path.join(processCwd, `${name}-enc`); // carpeta donde se guardaran los archivos
  fs.mkdirSync(savePath);// se crea la carpeta
  const [encryptedData, key, iv] = Encrypt.encryptedFile(argv.path); // se encripta el contenido
  // se escriben el archivo encriptado ".enc" y los archivos que se necesitarán para desencriptarlo
  fs.writeFileSync(path.join(savePath, `${name}.enc`), encryptedData);
  fs.writeFileSync(path.join(savePath, `${name}.key`), key);
  fs.writeFileSync(path.join(savePath, `${name}.iv`), iv);
  fs.writeFileSync(path.join(savePath, `${name}.filetype`), ext);
};

// se agrega el comando a yargs
yargs.command({
  command: "encrypt",
  describe: "Encriptar Archivos",
  builder: {
    path: {
      describe: "Ruta Al Archivo",
      type: "string",
      demandOption: "Se Necesita La Ruta Al Archivo",
    },
  },
  handler: (argv) => {
    try {
      func(argv);
    } catch (error) {
      console.error("Error:", red(error));
    }
  },
});
