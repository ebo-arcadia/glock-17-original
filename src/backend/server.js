// create a server
const http = require("http");
const url = require("url");
const fs = require("fs");

const replaceHtmlTemplateWithProductData = (card, product) => {
  let output = card.replace(/{%productName%}/g, product.productName);
  output = output.replace(/{%productImage%}/g, product.image);
  output = output.replace(/{%productPrice%}/g, product.price);
  output = output.replace(/{%productFrom%}/g, product.from);
  output = output.replace(/{%productQuantity%}/g, product.quantity);
  output = output.replace(/{%productDescription%}/g, product.description);
  console.log("product id", product.id);
  output = output.replace(/{%productId%}/g, product.id);
  if (!product.organic) output = output.replace(/{%organic%}/g, "not-organic");
  return output;
};

const productData = fs.readFileSync(
  `${__dirname}/../../data/product-data.json`,
  "utf8"
);
const overview = fs.readFileSync(
  `${__dirname}/../../src/interface/overview.html`,
  "utf8"
);
const product = fs.readFileSync(
  `${__dirname}/../../src/interface/product.html`,
  "utf8"
);
const card = fs.readFileSync(
  `${__dirname}/../../src/interface/card.html`,
  "utf8"
);
const productObj = JSON.parse(productData);

const httpServer = http.createServer((request, response) => {
  const path = url.parse(request.url, true);
  const { query, pathname } = url.parse(request.url, true);
  console.log(path);
  if (pathname === "/" || pathname === "/home") {
    response.writeHead(200, { "Content-type": "text/html" });
    const productCard = productObj
      .map((product) => replaceHtmlTemplateWithProductData(card, product))
      .join("");
    const output = overview.replace("{%productCard%}", productCard);
    response.end(output);
  } else if (pathname === "/product") {
    response.end("Product page!");
  } else if (pathname === "/api") {
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
