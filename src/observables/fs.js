const {
    Observable
} = require("rx")
const fs = require("fs")

const _ = {};


_.exists = function (path) {
    return Observable.just(fs.existsSync(path))
}

_.mkdir = Observable.fromNodeCallback(fs.mkdir, (err) => {
    return err == void 0
})


module.exports = _