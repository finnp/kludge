var fs = require('fs')
var fork = require('child_process').fork
var spawn = require('child_process').spawn
var detective = require('detective')
var builtins = require('builtins')
var validate = require('validate-npm-package-name')
var temp = require("temp").track()

function run(file) {
  var src = fs.readFileSync(file)
  var modules = detective(src)
    .filter(function (modu) { return builtins.indexOf(modu) === -1 })
    .filter(function (modu) { return validate(modu).validForOldPackages})

  var tmpdir = temp.mkdirSync('kludge-run')

  spawn('npm', ['install'].concat(modules)).on('exit', installCb)

  function installCb() {
    fork(file, [], {env: {'NODE_PATH': tmpdir}})
  }
}

module.exports = run