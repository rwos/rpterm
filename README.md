# rpterm

A graphical typewriter.

## Setup

* `make`
* `make run` (or `make debug`)
* `make install` installs it in `/opt/rpterm`
  (weird location because there's no packaging yet)

## Escape Codes

rpterm understands most escape codes that xterm understands (and in fact,
identifies as a TERM=xterm-256color so that termcap programs don't freak out).

Additionally supported are:

#### [NOT IMPLEMENTED YET] iterm2 embed OSC 1337

`OSC 1337 ; FILESPEC BEL` (OSC is `ESC ]`)

* iterm2's embedding code - for an explanation of what to put in for
  `FILESPEC`, see https://iterm2.com/images.html
* rpterm *only supports embedding images* with this escape code (but see OSC 1338
  below) - on iterm2 you can also embed PDFs with OSC 1337.
* rpterm does not support downloading files via this escape code.
* rpterm also understands the somewhat more usual terminating
  `ST` (`ESC 0x5c`) instead of the `BEL` - it's unclear if iterm2 does, too.

#### rpterm embed OSC 1338

`OSC 1338 ; MIMETYPE ; DATA BEL` (and `OSC 1338 ; MIMETYPE ; DATA ST`)

* `MIMETYPE` can be the specific mime type (`image/gif`) or you can leave out
  the second part (just `image`). No wildcards are supported.
* `DATA` is the base64 encoded data that you want to display.
* Not all mime types are supported but there's currently no list about what
  is supported (the goal is certainly to support as many as possible).

## Examples

* `printf '\033]1338;image;'; curl -s https://http.cat/200 | base64; printf '\033\\'`

## Bugs

* Xterm compatible mouse support is implemented (by xterm.js) but doesn't work
  here for some weird reason (see also https://github.com/f/atom-term2/issues/195).
* The shell to execute is hard-coded to `/bin/bash -i`.
* Using a web browser to display a shell is ridiculous.
* I can't figure out how to make this abdomination display a misc-fixed font.
* It should be possible to stream OSC 1337/1338 data, but it isn't:

```
# doesn't work, but should
$ curl -s https://http.cat/303 > /tmp/cat.jpg
$ printf '\033]1338;image/jpeg;'; \
    cat /tmp/cat.jpg | base64 | head -c 100; \
    sleep 3; \
    cat /tmp/cat.jpg | base64 | tail -c +101; \
    printf '\033\\'`
```

## Not Bugs

* There is no direct way for programs to write HTML for the terminal to
  display because the author hopes to get rid of the HTML/browser
  implementation eventually.

## Known Design Problems

* The untyped nature of byte streams in unix makes interpreting them a fiddly,
  and ultimately buggy, balancing act.
* It's unclear whether inline UI code (via escape codes) is a good idea at all.
* The graphical escape codes always use, in cursor-addressing terms,
  a full row (with "one character" in it). Because of that, it is tricky to
  combine them with cursor-addressing escape codes (though one could call that
  a feature). These "graphical" rows also don't interact with other escape
  codes (bold, colors, etc.), though that could be fixed where it makes sense.
* While this can be made to be just as powerful as "real" GUIs output-wise,
  the input side of things is pretty much missing here.

## Author and License

Copyright 2016 by Richard Wossal <richard@r-wos.org>

Permission to use, copy, modify, distribute, and sell this software
and its documentation for any purpose is hereby granted without fee,
provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in
supporting documentation.  No representations are made about the
suitability of this software for any purpose.  It is provided "as
is" without express or implied warranty.

Parts of this based on https://github.com/atom/electron-quick-start,
(CC0/Public Domain)

and the xterm.js demo at https://github.com/sourcelair/xterm.js/tree/master/demo,
Copyright (c) 2014-2016, SourceLair, Private Company (www.sourcelair.com) (MIT License)
Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)

## Credits

Thanks to iterm2 (http://iterm2.com/) for inspiration and for ESC ] 1337.

This program has pretty much nothing in common with it, but if you're
interested in how one would do similar things properly, have a look at Plan 9's
draw device (http://plan9.bell-labs.com/magic/man2html/3/draw) and rio
(http://plan9.bell-labs.com/magic/man2html/1/rio9) and drawterm
(http://plan9.bell-labs.com/magic/man2html/8/drawterm).
