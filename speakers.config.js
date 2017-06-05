const ModuleMapper = require("./contrib/ModuleMapper")
const SequelizePlugin = require("./contrib/SequelizePlugin")

const mapper = new ModuleMapper();
const persistence = new SequelizePlugin("mysql://zombispormedio:wantedhex@localhost:3306/i18n");

module.exports = {
    mapper,
    persistence
}