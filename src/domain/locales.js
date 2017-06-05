const Observable = require('../observables/main')

const _ = {}

const LOCALES_DIR = process.cwd() + "/locales"
const DEFAULT_LANGS = ['en', 'es']

_.getLocalesDir = () => LOCALES_DIR

_.getLocalePath = (filename) => LOCALES_DIR + "/" + filename

_.getDefaultLangs = (extra) => DEFAULT_LANGS.concat(extra || [])

_.existsDir = () => Observable.exists(_.getLocalesDir())



module.exports = _