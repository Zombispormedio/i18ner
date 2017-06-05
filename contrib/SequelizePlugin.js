const DefaultPersistence = require("../src/plugins/DefaultPersistence")

var Sequelize;

try{
    Sequelize = require("sequelize")
}catch(e){
    console.warn("Install sequelize and every dependencies that it needs")
    process.exit()
}

const {Observable} = require("rx")

function SequelizePlugin(url) {
    DefaultPersistence.call(this)
    this.sequelize = new Sequelize(url);
    this.models = {}
}
SequelizePlugin.prototype = Object.create(DefaultPersistence.prototype)
SequelizePlugin.prototype.constructor = SequelizePlugin

SequelizePlugin.prototype.isAvailable = function () {
    return Observable.fromPromise(this.sequelize.authenticate())
        .map(() => true)
}

SequelizePlugin.prototype.defineModel = function (key, options, tableName) {
    this.models[key] = this.sequelize.define(key, options, {tableName, timestamps: false})
}

SequelizePlugin.prototype.defineAssociations = function (assoc) {
    assoc(this.models)
}

SequelizePlugin.prototype.defineProcedure = function (procedure) {
    this.procedure = procedure
}

SequelizePlugin.prototype.save = function (data) {
    return this.procedure(data, this)
}

SequelizePlugin.prototype.finish = function () {
    this.sequelize.close()
}

SequelizePlugin.prototype.findOrCreate = function (model, options) {
  return Observable.fromPromise(model.findOrCreate(options))
            .map((result)=>result[0].get({plain: true}))
}


SequelizePlugin.prototype.createOrUpdate = function (model, options) {
    return Observable.fromPromise(model.findOrCreate(options.query))
            .flatMap((result)=>{
                const data = result[0].get({plain: true})
                const created = result[1]
                if(!created){
                    if(options.distinct(data)){
                        return model.update(options.data, options.query)
                    }
                }
                return Observable.just(data)
            })
}




module.exports = SequelizePlugin