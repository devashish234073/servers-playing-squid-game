var http = require("http");
var lambda = require("./lambda");
var nth = 20;
if (process.argv.length == 3) {
    nth = parseInt(process.argv[2]);
    var response = lambda.handler({ "body": '{"nth":"' + nth + '"}' });
    console.log(response);
} else if (process.argv.length == 4 && String(process.argv[2]).toUpperCase() == "PORT") {
    var PORT = parseInt(process.argv[3]);
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 days
        /** add other headers as per requirement */
    };
    var server = http.createServer((req, res) => {
        console.log(req.method+" "+req.url);
        if (req.method == "OPTIONS") {
            res.writeHead(204, headers);
            res.end();
            return;
        } else {
            var body = "";
            req.on('data', chunk => {
                console.log("in process...: " + body);
                body += chunk.toString('utf8'); // convert Buffer to string
                console.log("in process...: " + body);
            });
            req.on('end', () => {
                console.log("this is body...:[" + body + "]");
                var response = lambda.handler({ "body": body });
                response.then(function (data) {
                    res.writeHead(200, headers);
                    res.end(data["body"]);
                });
            });
        }
    });
    server.listen(PORT, function () {
        console.log(`Started listening at PORT: ${PORT}`);
    });
} else {
    console.log("insufficient number of arguments provided..")
}