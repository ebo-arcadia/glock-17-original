// create a server
const http = require("http");
const url = require("url");
const fs = require("fs");

const productData = fs.readFileSync(
  `${__dirname}/../data/product-data.json`,
  "utf8"
);
const productObj = JSON.parse(productData);

const httpServer = http.createServer((request, response) => {
  let path = request.url;
  if (path === "/" || path === "/home") {
    response.end("Home page");
  } else if (path === "/api") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(productData);
  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "personal-header": "personal header",
    });
    response.end("<h1> Page not found! </h1>");
  }
});

const portNumber = 8001;
httpServer.listen(portNumber, "127.0.0.1", () => {
  console.log(`Server starts on port ${portNumber}`);
});
