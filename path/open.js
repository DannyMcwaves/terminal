/*
there is a simple yet not easy to use method on the fs module object
file out there called 'open' that requires the use of buffers and the
open types for the operations that are performed on files.

like writing or reading a file or appending to it.
this should be rather simple for operating on the file paths
chosen byt the user.

OKAY, SO WHAT IS THE GAME PLAN OVER HERE.

WE SHOULD HAVE THE FOLLOWING METHODS.
-----------WRITE.
-----------READ..
-----------APPEND.

*/

var fs = require('fs');


module.exports = function (path) {
    "use strict";
    var open = fs.open;

    function Open(pathname) {
        this.pathname = pathname;
        this.read = function (callback) {
            var self = this;

            open(this.pathname, 'r', function (error, fd) {
                error ? error : console.log("pass");

                var stat = fs.statSync(self.pathname);
                buffer = new Buffer(stat.size);

                fs.read(fd, buffer, 0, buffer.length, null, function (err, bytes, data) {
                    err ? err : console.log("pass");
                    callback(data);

                    fs.close(fd);
                });
            });
        };

        this.write = function (data, callback) {
            var self = this;

            open(this.pathname, 'w', function (error, fd) {
                error ? error : console.log("pass");

                buffer = new Buffer(data);

                fs.write(fd, buffer, 0, buffer.length, null, function (err, written, buffer) {
                    err ? err : console.log("pass");
                    console.log(written);

                    callback ? callback(buffer) : console.log(null);

                    fs.close(fd);
                });
            });
        };


        this.append = function (data, callback) {
            var self = this;

            open(this.pathname, 'a+', function (error, fd) {
                error ? error : console.log("pass");

                buffer = new Buffer("\n" + data);

                fs.write(fd, buffer, 0, buffer.length, null, function (err, written, buffer) {
                    err ? err : console.log("pass");
                    console.log(written);

                    callback ? callback(buffer) : console.log(null);

                    fs.close(fd);
                });
            });
        };

    }


    return new Open(path);
};
