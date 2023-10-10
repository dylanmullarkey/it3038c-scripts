var http = require("http");
var fs = require("fs");
var os = require("os");
var ip = require('ip');

http.createServer(function(req, res){

    if (req.url === "/") {
        fs.readFile("./Public/index.html", "UTF-8", function(err, body){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(body);
    });
}
    else if(req.url.match("/sysinfo")) {
        var seconds = os.uptime();
        var minutes = (seconds / 60);
        var hours = (minutes / 60);
        var days = (hours / 24);

        seconds = Math.floor(seconds)
        minutes = Math.floor(minutes);
        hours = Math.floor(hours);
        days = Math.floor(days);

        days = days % 24
        hours = hours % 60;
        minutes = minutes % 60;
        seconds = seconds % 60;

        html=`    
        <!DOCTYPE html>
        <html>
          <head>
            <title>Node JS Response</title>
          </head>
          <body>
            <p>Hostname: ${myHostName}</p>
            <p>IP: ${ip.address()}</p>
            <p>Server Uptime: ${days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds."}</p>
            <p>Total Memory: ${(os.totalmem() * 0.000001).toFixed(2) + " MB"}</p>
            <p>Free Memory: ${(os.freemem() * 0.000001).toFixed(2) + " MB"}</p>
            <p>Number of CPUs: ${os.cpus().length}</p>            
          </body>
        </html>` 
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end(`404 File Not Found at ${req.url}`);
    }
}).listen(3000);

console.log("Server listening on port 3000");