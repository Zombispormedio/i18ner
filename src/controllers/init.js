const Observable = require('../observables/main')

const LOCALES_DIR = process.cwd() + "/locales"
const DEFAULT_LANGS = ['en', 'es']

const _ = {}

_.existLocalesDir = () => Observable.exists(LOCALES_DIR)

_.resolveExistDir = (exists) => {
    if (exists) {
        console.log("Locales directory have already been created")
        return Observable.just(true);
    } else {
        console.log("Creating locales directory")
        return Observable.mkdir(LOCALES_DIR)
    }
}

_.addLocales = function(otherLangs){
    return () => Observable.fromArray(DEFAULT_LANGS.concat(otherLangs))
}

_.existLocale = (locale) =>{
    const pathname = LOCALES_DIR+"/"+locale+".yml"
    return Observable.exists(pathname)
    .map(exists => {
        return {name:locale, exists, pathname}
    })
}

_.createLocale = (locale) =>{
    return Observable.createFile(locale.pathname)
}

_.init = function(otherLangs){
    _.existLocalesDir()
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