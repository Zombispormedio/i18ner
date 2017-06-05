const DefaultMapper = require("../src/plugins/DefaultMapper")

function ModuleMapper() {
    DefaultMapper.call(this)
}
ModuleMapper.prototype = Object.create(DefaultMapper.prototype)
ModuleMapper.prototype.constructor = ModuleMapper

const flatten = function (obj) {
    const result = {}
    const recurse = (cur, prop) => {
        if (typeof cur == 'string') {
            result[prop] = cur
        } else {
            let isEmpty = true
            for (let p in cur) {
                isEmpty = false
                recurse(cur[p], prop ? prop + "." + p : p)
            }
            if (isEmpty && prop) {
                result[prop] = {}
            }
        }
    }
    recurse(obj, "")
    return result
}

ModuleMapper.prototype.apply = function (entity) {
    return Object.keys(entity).reduce((memo, key) => {
        memo[key] = flatten(entity[key])
        return memo
    }, {})
}

module.exports = ModuleMapper