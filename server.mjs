import http from "http";

const hostname = "localhost";
const port = 8080;

const server = http.createServer(function (request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("Hello World\n");
});

server.listen(port, hostname, function (){
    console.log(`Server running at http://${hostname}:${port}/`);
});
