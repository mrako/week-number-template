#!/usr/bin/env node

const yargs = require('yargs');

const weeknumber = require('./src/weeknumber');

yargs(process.argv.slice(2))
  .usage('Usage: npx @hopefullyworks/week-number [options]')
  .example('npx @hopefullyworks/week-number', 'show the current week number')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .argv;

console.log(`The current week number is ${weeknumber.getWeekNumber()}.`);
