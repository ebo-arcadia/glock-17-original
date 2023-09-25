// create a server
const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceHtmlTemplateWithProductData = require('../../modules/replaceHtmlTemplateWithProductData');

const productData = fs.readFileSync(
  `${__dirname}/../../data/product-data.json`,
  'utf8'
);
const overview = fs.readFileSync(
  `${__dirname}/../../src/interface/overview.html`,
  'utf8'
);
const productView = fs.readFileSync(
  `${__dirname}/../../src/interface/product.html`,
  'utf8'
);
const card = fs.readFileSync(
  `${__dirname}/../../src/interface/card.html`,
  'utf8'
);
const productObj = JSON.parse(productData);
const sluggedProductName = productObj.map((product) =>
  slugify(product.productName, { lower: true })
);

const httpServer = http.createServer((request, response) => {
  const path = url.parse(request.url, true);
  const { query, pathname } = path;
  if (pathname === '/' || pathname === '/home') {
    response.writeHead(200, { 'Content-type': 'text/html' });
    const productCard = productObj
      .map((product) => replaceHtmlTemplateWithProductData(card, product))
      .join('');
    const output = overview.replace('{%productCard%}', productCard);
    response.end(output);
  } else if (pathname === '/product') {
    response.writeHead(200, {
      'Content-type': 'text/html',
    });
    const productId = productObj[query.id];
    const slug = sluggedProductName[productId];
    console.log(slug);
    const output = replaceHtmlTemplateWithProductData(productView, productId);
    response.end(output);
  } else if (pathname === '/api') {
    response.writeHead(200, { 'Content-type': 'application/json' });
    response.end(productData);
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html',
      'customized-header': 'customized header',
    });
    response.end('<h1> Page not found! </h1>');
  }
});

const portNumber = 8001;
httpServer.listen(portNumber, '127.0.0.1', () => {
  console.log(`Server starts on port ${portNumber}`);
});
