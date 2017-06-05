const {Observable} = require("rx")
const fs = require("fs")

const _ = {};

_.exists = function (path) {
    return Observable.just(fs.existsSync(path))
}

_.mkdir = Observable.fromNodeCallback(fs.mkdir, null, (err) => {
    return err == void 0
})

_.openFile = Observable.fromNodeCallback(fs.open, (err, fd) => fd);

_.closeFile = Observable.fromNodeCallback(fs.close, null, (err) => err == void 0);

_.createFile = (pathname) => _.openFile(pathname, "wx").flatMap(fd =>  _.closeFile(fd))

_.readdir = (path) => Observable.fromNodeCallback(fs.readdir, (err, files) => files)(path);

_.deleteFile = (path) => Observable.fromNodeCallback(fs.unlink, null, (err) => err == void 0)(path);

_.rmdir = (path) => Observable.fromNodeCallback(fs.rmdir, null, (err) => err == void 0)(path);

module.exports = _