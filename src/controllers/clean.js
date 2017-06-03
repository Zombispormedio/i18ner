const Observable = require('../observables/main')

const _ = {}



_.init = function(){
    Observable.prompt("Do you want to remove locale files?")
}


module.exports = {
    init : () => _.init,
    test : () => _
}