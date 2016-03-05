var terminalContainer = document.getElementById('terminal-container'),
    term = new Terminal();

term.open(terminalContainer);
term.fit();
window.onresize = function() {
    console.log("RESIZE");
    term.fit();
};

var shell = require("remote").require('./shell');
shell.start(function stdout(s) {
        term.write(s.split("\n").join("\r\n"));
    }, function stderr(s) {
        term.write(s.split("\n").join("\r\n"));
    }, function close(code) {
        term.write('SHELL EXITED');
    }, function html(s) {
        console.log(s);
        term.children[term.y].innerHTML = s;
        term.y++;
        //term.prompt();
    });

term.on('key', function (key, ev) {
  shell.feed(key);
  return;
});