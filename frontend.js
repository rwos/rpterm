var term = new Terminal();

function appendterm() {
  term = new Terminal();
  var container = document.createElement('div')
  container.className = 'terminal-container'
  document.body.appendChild(container)
  term.open(container)
  term.fit()
  window.onresize = function () {
    term.fit()
  }
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
}
appendterm()


var shell = require('remote').require('./shell')

function rptermwrite(s) {
  if (false || s.indexOf("\x033[1338HTML") > -1) { /// XXX
    // Got HTML escape code: close term, append HTML, then open new term
    // XXX this whole concept is super hacky, should be all in one term,
    // with rows of different heights
    term.cursorHidden = true;
    term.write("\n")
    term.refresh()
    var line = term.rowContainer.children[0]
    term.rowContainer.style.height = (term.y * line.scrollHeight) + 'px'
    term.cursorHidden = false
    appendterm()
  }
  term.write(s);
}

shell.start(
    function stdout (s) { rptermwrite(s); },
    function stderr (s) { rptermwrite(s); }
)

