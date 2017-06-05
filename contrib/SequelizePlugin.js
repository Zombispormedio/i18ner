const DefaultPersistence = require("../src/plugins/DefaultPersistence")
const Sequelize = require("sequelize")
const {Observable} = require("rx")

function SequelizePlugin(url){
    DefaultPersistence.call(this)
    this.sequelize = new Sequelize(url);
    this.models = {}
}
SequelizePlugin.prototype = Object.create(DefaultPersistence.prototype)
SequelizePlugin.prototype.constructor =SequelizePlugin

SequelizePlugin.prototype.isAvailable = function(){
    return Observable.fromPromise(this.sequelize.authenticate())
}


module.exports = SequelizePlugin