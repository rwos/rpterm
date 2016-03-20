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

  function rpterm_abs_path() {
    realpath "$1" 2>/dev/null || \
      readlink -f "$1" 2>/dev/null || \
      greadlink -f "$1" 2>/dev/null || \
      printf "%s" "$1" | grep "^/" || \
      echo "$PWD/$1"
  }

  function rpterm_hash() {
    printf "%s" "$1" | sha1sum | command cut -d ' ' -f 1
  }

  function rpterm_genthumbnail() {
    mkdir -p "$HOME/.cache/rpterm/thumbnail/"
    namehash="$(rpterm_hash "$1")"
    convert "$1" -resize 64x64 "$HOME/.cache/rpterm/thumbnail/$namehash" 2>/dev/null
  }

  function rpterm_wrap_files() {
    if ! [ -t 1 ]
    then
      command cat "$@"
      return
    fi
    for f in "$@"
    do
      mime="$(command cat "$f" 2>/dev/null | command file -i -b - | command cut -d ';' -f 1)"
      ### XXX only image here
      command printf "%s" "$mime" | if command grep -q 'image'
      then
        command printf '\033]1338;%s;file://%s\033\\' "$mime" $(rpterm_abs_path "$f")
      else
        command cat "$f"
      fi
    done
  }

  function rpterm_wrap_inline() {
    cmd="$1"; shift
    if ! [ -t 1 ]
    then
      command "$cmd" "$@"
      return
    fi
    tmp="$(mktemp)"
    mime="$(command "$cmd" "$@" | command tee "$tmp" | command file -i -b - | command cut -d ';' -f 1)"
    ### XXX only image here
    command printf "%s" "$mime" | if command grep -q 'image'
    then
      command printf '\033]1338;%s;data:%s;base64,' "$mime" "$mime"
      command cat "$tmp" | base64
      command printf '\033\\'
    else
      command cat "$tmp"
    fi
    rm -f "$tmp"
  }

  #### wrappers

  function curl() {
    rpterm_wrap_inline curl -s "$@"
  }

  function cat() {
    if [ $# -eq 0 ]
    then
      rpterm_wrap_inline cat
    else
      rpterm_wrap_files "$@"
    fi
  }

  ### XXX this is too buggy to replace ls currently
  #alias ls=ls # has color=auto by default on debian
  function imgls() {
    if [ $# -eq 0 ]
    then
      for f in *
      do
        abs="$(rpterm_abs_path "$f")"
        echo "$f"
        if [ -f "$HOME/.cache/rpterm/thumbnail/$(rpterm_hash "$abs")" ]
        then
          rpterm_wrap_inline cat "$HOME/.cache/rpterm/thumbnail/$(rpterm_hash "$abs")"
        else
          rpterm_genthumbnail "$abs"
          rpterm_wrap_inline cat "$HOME/.cache/rpterm/thumbnail/$(rpterm_hash "$abs")" 2>/dev/null
        fi
      done
    else
      command ls "$@"
    fi
  }
*/})}
