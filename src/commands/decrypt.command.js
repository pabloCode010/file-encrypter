const yargs = require("yargs");
const path = require("path");
const fs = require("fs");

const Encrypt = require("../services/encrypt.service");

const func = (argv) => {
  const processCwd = process.cwd(); // devuelve la ruta desde donde se ejecuta el programa
  if (!path.isAbsolute(argv.path)) {
    argv.path = path.join(processCwd, argv.path); // se concatena la ruta desde donde se ejecuto, con la ruta pasada como argumento
  }
  // verificar si el archivo existe
  if (!fs.existsSync(argv.path)) {
    throw new Error("No Existe El Archivo Especificado");
  }
  const { name, ext, dir } = path.parse(argv.path); // se extraen el nombre base del archivo, extension y ruta a la carpeta en donde está

  if (ext != ".enc") {
    throw new Error("No Es Archivo Tipo \".enc\"");
  }
  // rutas a los archivos necesarios
  const keyFile = path.join(dir, `${name}.key`);
  const ivFile = path.join(dir, `${name}.iv`);
  const fileType = path.join(dir, `${name}.filetype`);

  // se verifica si estan los archivos obligatorios
  if (!fs.existsSync(keyFile)) {
    throw new Error(`No Existe Archivo "${name}.key"`);
  }
  if (!fs.existsSync(ivFile)) {
    throw new Error(`No Existe Archivo "${name}.iv"`);
  }

  console.log("File:", argv.path);
  const key = fs.readFileSync(keyFile);
  const iv = fs.readFileSync(ivFile);
  // se define la extension del archivo encriptado
  let type = "";
  if (fs.existsSync(fileType)) {
    type = fs.readFileSync(fileType);
  } else {
    console.log(`No Hay Un  Archivo ${name}.filetype, No Se Asignara Extensión`);
  }
  // se desencripta el archivo
  const decryptedData = Encrypt.decryptedFile(argv.path, key, iv);
  // se escribe en la ruta donde fue llamado el programa
  fs.writeFileSync(path.join(processCwd, `${name}${type}`), decryptedData);
};

// se agrega el comando a yargs
yargs.command({
  command: "decrypt",
  describe: "Desencriptar Archivos",
  builder: {
    path: {
      describe: "Ruta Al Archivo Encriptado",
      type: "string",
      demandOption: "Se Necesita La Ruta Al Archivo",
    },
  },
  handler: (argv) => {
    try {
      func(argv);
    } catch (error) {
      console.error(error);
    }
  },
});
