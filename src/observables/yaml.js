const {Observable} = require("rx")
const yaml = require('js-yaml')

const _ = {}


_.loadYaml = (data) => Observable.just(yaml.safeLoad(data))

module.exports = _