const {Observable}  = require("rx")

const _ = {};

_.just = Observable.just

_.fromArray = Observable.fromArray


module.exports = _