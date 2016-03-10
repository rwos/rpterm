var pty = require('pty.js')
var heredoc = require('heredoc') // help
var shellp

exports.start = function start (cb_out, cb_err) {
  shellp = pty.spawn('/bin/bash', ['-i'], {
    name: 'xterm-256color',
    cwd: process.cwd(),
    env: process.env
  })
  var init = true;
  shellp.on('data', (data) => {
    if (init) {
      if (data === 'RPTERM_INIT_DONE') {
        init = false
      }
      return
    }
    cb_out(data.toString())
  })
  shellp.on('close', () => {
    process.exit(0)
  })
  shellp.on('error', (err) => {
    console.error(err)
  })
  shellp.write(init_wrappers());
  shellp.write(' printf "%s%s" RPTERM_ INIT_DONE\n');
}

exports.feed = function feed (key) {
  shellp.write(key + '')
}

exports.resize = function resize (cols, rows) {
  shellp.resize(cols, rows)
}

function init_wrappers () { return heredoc(function() {/*
  function rpterm_wrap() {
    ### TODO: check if stdout is tty
    cmd="$1"; shift
    tmp="$(mktemp)"
    mime="$(command "$cmd" "$@" | command tee "$tmp" | command file -i -b - | command cut -d ';' -f 1)"
    ### XXX only image here
    command printf "%s" "$mime" | if command grep -q 'image'
    then
      command printf '\033]1338;%s;' "$mime"
      command cat "$tmp" | base64
      command printf '\033\\'
    else
      command cat "$tmp"
    fi
    rm -f "$tmp"
  }

  function curl() {
    rpterm_wrap curl -s "$@"
  }

  function cat() {
    rpterm_wrap cat "$@"
  }
*/})}
