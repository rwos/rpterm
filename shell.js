var child_process = require('child_process');
var pty = require('pty.js');
var fileType = require('file-type');
        //var t = fileType(cur);
        //if (!t) {
            //cb_out(cur.toString());
        //} else {
            //html = '<img src="data:' + t.mime + ';base64,' + cur.toString('base64') + '">';
            //cb_html(html);
            //console.log(html, t);
        //}

var shellp;

exports.start = function start(cb_out, cb_err, cb_html) {

    shellp = pty.spawn('/bin/bash', ['-i'], {
      name: 'xterm-color',
      // cols: 80, /// XXX
      // rows: 30, /// XXX
      cwd: process.cwd(),
      env: process.env 
    });

    shellp.on('data', (data) => {
        console.log("IN", data); 
        cb_out(data.toString());
    });
    shellp.on('close', (code) => {
        process.exit(0);
    });
    shellp.on('error', (err) => {
  console.log(err);
});
}

exports.feed = function feed(key) {
    console.log("WRITING", key + '', key.charCodeAt(0));
    shellp.write(key + '');
};
