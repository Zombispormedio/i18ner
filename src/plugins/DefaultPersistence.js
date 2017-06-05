const Observable = require("../observables/main")

function DefaultPersistence(){

}

DefaultPersistence.prototype.isAvailable = () => Observable.just("Success")


DefaultPersistence.prototype.save = (data) => Observable.just("Success")


DefaultPersistence.prototype.finish = () => {}

module.exports = DefaultPersistence