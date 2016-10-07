//this is supposed to be the dir folder

var fs = require('fs'),
    print = require('./print');

module.exports = function (path) {

    function Dir(pathname) {
        this.dir = pathname;
        this.read = function (callback) {
            fs.readdir(this.dir, function(error, data) {
                print(error ? error : 'pass');
                callback(data);
            });
        }
        this.sread = function () {
            return fs.readdirSync(this.dir);
        }
    }

    return new Dir(path);
};
