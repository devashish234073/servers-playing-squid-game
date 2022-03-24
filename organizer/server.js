var basePath = __dirname;
var http = require('http');
var fs = require('fs');
var path = require('path');
var players = [];
if (process.argv.length == 4 && String(process.argv[2]).toUpperCase() == "PORT") {
    var PORT = parseInt(process.argv[3]);
    var server = http.createServer(function (req, res) {
        if (req.url == "/") {
            var html = fs.readFileSync("index.html");
            res.end(html);
        } else if (req.url == "/eliminated.png") {
            var stream = fs.createReadStream(path.join(basePath, req.url));
            stream.on('error', function () {
                res.writeHead(404);
                res.end();
            });
            stream.pipe(res);
        }
    });
    server.listen(PORT, function () {
        console.log(`Started listening at PORT: ${PORT}`);
    });
} else {
    console.log("insufficient number of arguments provided..")
}