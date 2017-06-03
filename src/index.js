#!/usr/bin/env node

const program = require('commander');

program
    .version('0.1.0')

program.command("on [otherLangs...]")
    .description('create locale dir, english and spanish are created by default')
    .action(require("./controllers/init").init())

program.command("off")
    .description('clean locale dir')
    .action(require("./controllers/clean").init())

program.command("add [otherLangs...]")
    .description('add locales files')
    .action(require("./controllers/add").init())


program.command("sync")
    .description('Sync all locale files')
    .action(require("./controllers/sync").init())


program.command("play")
    .description('Upload translation following speakers.config.js')
    .action(require("./controllers/start").init())



program.parse(process.argv)