const Observable = require('../observables/main')
const Locales = require("../domain/locales")
const DefaultMapper = require("../plugins/DefaultMapper")
const DefaultPersistence = require("../plugins/DefaultPersistence")

const _ = {}

const speakersConfig = require(process.cwd()+"/"+"speakers.config.js")

_.checkConfiguration = function(){
    return speakersConfig.mapper instanceof DefaultMapper && speakersConfig.persistence instanceof DefaultPersistence
}


_.init = function(){
    if(!_.checkConfiguration()){
        return console.log("Bad configuration")
    }

    Locales.existsDir()
    .filter((exists) => exists)
    .flatMap(() => Observable.readdir(Locales.getLocalesDir()))
    .flatMap(Observable.fromArray)
    .map(name =>{
        return {name: name, pathname: Locales.getLocalePath(name)}
    })
    .flatMap(locale => {
        return Observable.readFile(locale.pathname)
                        .map(raw => Object.assign({raw}, locale))
    })
    .flatMap(locale => {
        return Observable.loadYaml(locale.raw)
                        .map(yamlObject => Object.assign({yamlObject}, {name: locale.name, pathname: locale.pathname}))
    })
    .map(locale =>{
        locale.yamlObject = speakersConfig.mapper.apply(locale.yamlObject)
        return locale
    })
    .doOnNext(console.log)
    .subscribe()
}


module.exports = {
    init : () => _.init,
    test : () => _
}