const yargs = require('yargs');

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
    console.log("File", argv.path);
  }
});