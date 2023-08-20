const yargs = require('yargs');

require("./src/commands/encrypt.command");
require("./src/commands/decrypt.command");

yargs.fail((msg, err, yargs) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.error('Error:', msg);
  }
  process.exit(1);
});


yargs.strict();
yargs.parse();

// node index.js encrypt --path C:\Users\pablo\OneDrive\Escritorio\encriptar-archivos\files\file.pdf
// node index.js encrypt --path files\file.pdf
// node index.js decrypt --path file-enc\file.enc