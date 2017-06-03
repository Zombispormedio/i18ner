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

_.openFile = Observable.fromNodeCallback(fs.open, (err, fd) => fd);

_.closeFile = Observable.fromNodeCallback(fs.close, null, (err) => err == void 0);

_.createFile = (pathname) => _.openFile(pathname, "wx").flatMap(fd =>  _.closeFile(fd))


module.exports = _