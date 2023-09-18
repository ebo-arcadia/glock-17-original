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
  output = output.replace(/{%productId%}/g, product.id);
  if (!output.organic)
    output = output.replace(/{%Not_organic%}/g, "not-organic");
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
  let path = request.url;
  if (path === "/" || path === "/home") {
    response.writeHead(200, { "Content-type": "text/html" });
    const productCard = productObj.map((product) =>
      replaceHtmlTemplateWithProductData(card, product)
    );
    console.info(productCard);
    response.end(overview);
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
