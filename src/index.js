#!/usr/bin/env node

const program = require('commander');

program
    .version('0.0.1')

program.command("on [otherLangs...]")
    .description('create locale dir, english and spanish are created by default')
    .action(require("./controllers/InitController").init())



program.parse(process.argv)