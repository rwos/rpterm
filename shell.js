var child_process = require('child_process');
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
    shellp = child_process.spawn('/bin/bash', ['-i']);
    shellp.stdout.on('data', (data) => {
        console.log("IN", data); 
        cb_out(data.toString());
    });
    shellp.stderr.on('data', (data) => {
        console.log("ERR", data); 
        cb_err(data.toString());
    });
    shellp.on('close', (code) => {
        process.exit(0);
    });
    shellp.on('error', (err) => {
  console.log('Failed to start child process.');
});
}

exports.feed = function feed(key) {
    console.log("WRITING", key + '', key.charCodeAt(0));
    shellp.stdin.write(key + '');
};
