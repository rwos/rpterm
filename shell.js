var pty = require('pty.js')
var shellp

exports.start = function start (cb_out, cb_err) {
  shellp = pty.spawn('/bin/bash', ['-i'], {
    name: 'xterm-256color',
    cwd: process.cwd(),
    env: process.env
  })
  shellp.on('data', (data) => {
    cb_out(data.toString())
  })
  shellp.on('close', () => {
    process.exit(0)
  })
  shellp.on('error', (err) => {
    console.error(err)
  })
}

exports.feed = function feed (key) {
  shellp.write(key + '')
}

exports.resize = function resize (cols, rows) {
  shellp.resize(cols, rows)
}
