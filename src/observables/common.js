const {Observable}  = require("rx")
const inquirer = require("inquirer")

const _ = {};

_.just = Observable.just

_.fromArray = Observable.fromArray

_.prompt = (message) =>{
}


module.exports = _