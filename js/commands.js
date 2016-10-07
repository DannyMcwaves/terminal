/*
    this part is for the commands that user will send into the computer for execution.
    I need to get hold of the command and the see what is necessary or what can be done
    to the commands.
*/

child = require("child_process").exec;
fs = require("fs");

module.exports = function command(com) {

    child(com, function (error, stdout, stderr) {
        var output;

        if (error) {output = error; }
        if (stderr === "") {
            output += stdout;
        } else {
            output += stderr;
        }
        $("article[output='true'] p").html(output.replace(/(\b\n\b)|(\n)/g, "<br/>"));
    });

}
