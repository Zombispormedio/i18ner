const {Observable} = require("rx")
const fs = require("fs")

const _ = {};

_.exists = (path) => {
    return Observable.just(fs.existsSync(path))
}

const fromSafeNodeCallback = (nodeFn) => {
    return Observable.fromNodeCallback(nodeFn, null, (err) => {
        return err == void 0
    })
}

_.mkdir = fromSafeNodeCallback(fs.mkdir)

_.openFile = Observable.fromNodeCallback(fs.open, (err, fd) => fd);

_.closeFile = fromSafeNodeCallback(fs.close);

_.createFile = (pathname) => _.openFile(pathname, "wx").flatMap(fd => _.closeFile(fd))

_.readdir = (path) => Observable.fromNodeCallback(fs.readdir, (err, files) => files || [])(path);

_.deleteFile = (path) => fromSafeNodeCallback(fs.unlink)(path);

_.rmdir = (path) => fromSafeNodeCallback(fs.rmdir)(path);

_.readFile = (path) => Observable.fromNodeCallback(fs.readFile, null, (data) => data||"")(path, 'utf8')


module.exports = _