const Observable = require('../observables/main')
const Locales = require("../domain/locales");

const _ = {}


_.init = function () {
  Observable.confirm("Every locale files are going to be removed. Are you sure?")
    .filter((obj) => obj.answer)
    .flatMap(Locales.existsDir)
    .filter((exists) => exists)
    .flatMap(() => Observable.readdir(Locales.getLocalesDir()))
    .flatMap(Observable.fromArray)
    .map(Locales.getLocalePath)
    .flatMap(Observable.deleteFile)
    .reduce((memo, value) => memo && value, true)
    .filter(result => result)
    .flatMap(() => Observable.rmdir(Locales.getLocalesDir()))
    .doOnCompleted(() => console.log("Ok"))
    .subscribe()
}


module.exports = {
  init: () => _.init,
  test: () => _
}