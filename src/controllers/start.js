const Observable = require('../observables/main')
const Locales = require("../domain/locales")
const DefaultMapper = require("../plugins/DefaultMapper")
const DefaultPersistence = require("../plugins/DefaultPersistence")

const _ = {}

_.checkConfiguration = function (mapper, persistence) {
    return mapper instanceof DefaultMapper && persistence instanceof DefaultPersistence
}


_.init = function () {
    const {
        mapper,
        persistence
    } = require(process.cwd() + "/" + "i18n.config.js")

    if (!_.checkConfiguration(mapper, persistence)) {
        return console.log("Bad configuration")
    }
    persistence.isAvailable()
        .filter(isAvailable => isAvailable)
        .flatMap(Locales.existsDir)
        .filter((exists) => exists)
        .flatMap(() => Observable.readdir(Locales.getLocalesDir()))
        .flatMap(Observable.fromArray)
        .map(filename => {
            return {
                filename: filename,
                pathname: Locales.getLocalePath(filename)
            }
        })
        .flatMap(locale => {
            return Observable.readFile(locale.pathname)
                .map(raw => Object.assign({
                    raw
                }, locale))
        })
        .flatMap(locale => {
            return Observable.loadYaml(locale.raw)
                .map(translation => Object.assign({
                    translation
                }, {
                    lang: locale.filename.split(".")[0],
                }))
        })
        .map(locale => {
            locale.translation = mapper.apply(locale.translation)
            return locale
        })
        .flatMap((locale) => persistence.save(locale))
        .doOnCompleted(() => {
            persistence.finish()
            console.log("Ok")
        })
        .subscribe()
}


module.exports = {
    init: () => _.init,
    test: () => _
}