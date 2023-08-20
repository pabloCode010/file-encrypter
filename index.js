const { red } = require('colorette');
const yargs = require('yargs');

require("./src/commands/encrypt.command");
require("./src/commands/decrypt.command");

yargs.fail((msg, err, yargs) => {
  if (err) {
    console.error('Error:', red(err.message));
  } else {
    console.error('Error:', red(msg));
  }
  process.exit(1);
});


yargs.strict();
yargs.parse();