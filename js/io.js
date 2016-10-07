
//what the fuck is thing doing overhere just hiding around over here like shit
// what the fuck is this file and all that shit going on around over here.
// what the fuck is this thing.
/*
this part is supposed to be used to read mainly files only and to used in the
path module.

first of all, we will have the readFile thingy that accepts a callback as to
what should be done to the data that has being passed on.
readFile --- accepts a callback;
readFileSync --- returns the data as a string synchronously.

writeFile --- accepts the data to be written to the file.
writeFileSync --- also accepts the data to be written to the file.

readStream --- returns a stream of the file's data.
writeStream --- returns a write stream of the data/// or accepts the data to write;

should i really have the open thingy though.
I think it is really unncessary to have that as far i am concerned;
I will let it open the file and then accept a callback.
*/

var fs = require('fs'),
    p = require('path'),
    print = require('./print');

module.exports = function (path) {

    function Read(pathname) {
        this.file = pathname;
        this.rename = function (name) {
            var self = this;
            fs.rename(this.file, name, function (err) {
                print(err ? err : 'pass');
                self.file = p.resolve(name);
            });
        },
        this.read = function (callback) {
            fs.readFile(this.file, function (error, data) {
                print(error ? error : 'pass');
                callback(data);
            })
        },
        this.sread = function () {
            return fs.readFileSync(this.file);
        },
        this.write = function (data) {
            // use this write thingy for a new file you have created that does not
            // contain any existing data.
            fs.writeFile(this.file, data);
            return 'done';
        },
        this.swrite = function (data) {
            // use this write thingy for a new file you have created that does not
            // contain any existing data.
            fs.writeFileSync(this.file, data);
            return 'done';
        },
        this.append = function (data) {
            var self = this;
            this.read(function(dat){
                var olddata = dat + "\n";
                self.write(olddata + data);
            })
            return 'done';
        },
        this.appendFile = function (data) {
            fs.appendFile(this.file, data, function (err) {
                print(err ? err : 'pass');
            });
        },
        this.readStream = function (callback) {
            var rstream =  fs.createReadStream(this.file);
            rstream.setEncoding("utf-8");
            rstream.on('data', function (data) {
                callback(data);
            })
            rstream.on('end', function () {
                print("done reading");
            })
        },
        this.writeStream = function (data) {
            var buffer = Buffer.from(data);
            var wstream = fs.createWriteStream(this.file);
            wstream.write(buffer);
            wstream.on("drain", function (drained) {
                print('done writing');
            })
        }
    }

    return new Read(path);
};
