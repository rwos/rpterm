var term = new Terminal();

var terminalContainer = document.getElementById('terminal-container')
term.open(terminalContainer)

term.fit()
window.onresize = function () {
  term.fit()
}

var shell = require('remote').require('./shell')

function rptermwrite(s) {
  term.write(s);
}

shell.start(
    function stdout (s) { rptermwrite(s); },
    function stderr (s) { rptermwrite(s); }
)

term.on('key', function key (key, ev) {
  shell.feed(key)
  return
})

term.on('resize', function resize (data) {
  shell.resize(data.cols, data.rows)
})

term.on('title', function title (t) {
  document.title = t;
});
