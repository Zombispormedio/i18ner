const {Observable} = require("rx")
const inquirer = require("inquirer")

const _ = {};

_.just = Observable.just

_.fromArray = Observable.fromArray

_.confirm = (message) => {
    return Observable.fromPromise(inquirer.prompt([{
        type: "confirm",
        name: "answer",
        message
    }]))
}


module.exports = _