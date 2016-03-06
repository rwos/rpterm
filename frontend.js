var terminalContainer = document.getElementById('terminal-container')
var term = new Terminal()

term.open(terminalContainer)
term.fit()
window.onresize = function () {
  console.log('RESIZE')
  term.fit()
}

var shell = require('remote').require('./shell')
shell.start(
    function stdout (s) { term.write(s.split('\n').join('\r\n')) },
    function stderr (s) { term.write(s.split('\n').join('\r\n')) }
)

term.on('key', function key (key, ev) {
  shell.feed(key)
  return
})

term.on('resize', function resize (data) {
  shell.resize(data.cols, data.rows)
})
