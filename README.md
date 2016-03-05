# rpterm

A graphical typewriter.

## Setup

* `make`
* `make run` (or `make debug`)

## Problems

* the layout engine can't be used seperately, and can't be switched out
* this only runs wherever chromium runs, porting it means porting chromium
  (instead of just a small IO part)

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
