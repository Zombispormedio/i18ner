const {
    just
} = require("../observables/common")
const {
    exists,
    mkdir
} = require('../observables/fs')

const LOCALES_DIR = process.cwd() + "/locales"

const _ = {}

_.existLocalesDir = () => exists(LOCALES_DIR)

_.resolveExistDir = (exists) => {
    if (exists) {
        console.log("Locales directory exists yet")
        return just(true);
    } else {
        console.log("Creating locales directory")
        return mkdir(LOCALE_DIR)
    }
}

_.createLocales = function(){
    console.log(arguments)
    return just(true)
}

_.init = function(otherLangs){
    _.existLocalesDir()
        .flatMap(_.resolveExistDir)
        .subscribe((result) => console.log(result), (err) => console.error(err))
}


module.exports = {
    init : () => _.init,
    test : () => _
}