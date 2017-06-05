const Observable = require('../observables/main')
const Locales = require("../domain/locales")

const _ = {}

_.resolveExistDir = (exists) => {
    if (exists) {
        console.log("Locales directory have already been created")
        return Observable.just(true);
    } else {
        console.log("Creating locales directory")
        return Observable.mkdir(Locales.getLocalesDir())
    }
}

_.addLocales = function(otherLangs){
    return () => Observable.fromArray(Locales.getDefaultLangs(otherLangs))
}

_.existLocale = (locale) =>{
    const pathname = Locales.getLocalePath(locale+".yml")
    return Observable.exists(pathname)
    .map(exists => {
        return {name:locale, exists, pathname}
    })
}

_.createLocale = (locale) =>{
    return Observable.createFile(locale.pathname)
}

_.init = function(otherLangs){
    Locales.existsDir()
        .flatMap(_.resolveExistDir)
        .flatMap(_.addLocales(otherLangs))
        .flatMap(_.existLocale)
        .filter(locale => !locale.exists)
        .flatMap(_.createLocale)
        .doOnCompleted(()=> console.log("Ok"))
        .doOnError((err)=>console.err(err))
        .subscribe()
}


module.exports = {
    init : () => _.init,
    test : () => _
}