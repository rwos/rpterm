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

#### iterm2 embed OSC 1337

`OSC 1337 ; FILESPEC BEL` (OSC is `ESC ]`)

* iterm2's embedding code, for an explanation of what to put in for
  `FILESPEC`, see https://iterm2.com/images.html
* rpterm only supports embedding images with this escape code (but see OSC 1338
  below) - on iterm2 you can also embed PDFs with OSC 1337.
* rpterm does not support downloading files via this escape code
* rpterm also understands the somewhat more usual terminating
  `ST` (`ESC 0x5c`) instead of the `BEL` - not sure if iterm2 does, too

#### rpterm embed OSC 1338

`OSC 1338 ; MIMETYPE ; DATA BEL` (and `OSC 1338 ; MIMETYPE ; DATA ST`)

* `MIMETYPE` can be the specific mime type (`image/gif`) or you can leave out
  the second part (just `image`). No wildcards are supported.
* `DATA` is the base64 encoded data that you want to display
* Not all mime types will be supported, and there's currently no real list
  about what is supported (the goal is certainly to support as many as possible)

## Examples

TODO

## Bugs

* "Examples" section is empty
* Xterm compatible mouse support is implemented (by xterm.js) but doesn't work
  here for some weird reason (see also https://github.com/f/atom-term2/issues/195).
* The shell to execute is hard-coded to `/bin/bash -i`.
* Using a web browser to display a shell is ridiculous.
* I can't figure out how to make this abdomination display a misc-fixed font.
* Because of how HTML output is hacked into this, it's impossible to combine
  rpterm's escape codes with older ones, especially cursor-addressing codes.

## Known Design Problems

* The layout engine can't be used separately, and can't be switched out.
* The untyped nature of byte streams in unix makes interpreting them a fiddly,
  and ultimately buggy, balancing act.
* It's unclear whether inline UI code (via escape codes) is a good idea at all.
* It's unclear how pictures and other graphical elements and row/column based
  cursor addressing are supposed to mix. They don't at all, in this program,
  but that doesn't really solve anything.

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

Thanks to iterm2 (http://iterm2.com/) for inspiration and for ESC [ 1337.

This program has pretty much nothing in common with it, but if you're
interested in how one would do similar things properly, have a look at Plan 9's
draw device (http://plan9.bell-labs.com/magic/man2html/3/draw) and rio
(http://plan9.bell-labs.com/magic/man2html/1/rio9) and drawterm
(http://plan9.bell-labs.com/magic/man2html/8/drawterm).
