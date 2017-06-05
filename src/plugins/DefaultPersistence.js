const Observable = require("../observables/main")

function DefaultPersistence(){

}

DefaultPersistence.prototype.isAvailable = () => Observable.just("Success")




module.exports = DefaultPersistence