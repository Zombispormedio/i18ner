const _ = {}

const speakersConfig = require(process.cwd()+"/"+"speakers.config.js")


_.init = function(){

}


module.exports = {
    init : () => _.init,
    test : () => _
}