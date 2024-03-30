#!/usr/bin/env node

const { main } = require('./scripts/generarCrud');
const args = process.argv.slice(2);

if (args.length < 1) {
  console.log("Por favor, proporciona el nombre del modelo como argumento.");
  process.exit(1);
}

main(args[0]);
