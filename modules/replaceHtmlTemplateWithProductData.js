module.exports = (card, product) => {
  let output = card.replace(/{%productName%}/g, product.productName);
  output = output.replace(/{%productImage%}/g, product.image);
  output = output.replace(/{%productPrice%}/g, product.price);
  output = output.replace(/{%productFrom%}/g, product.from);
  output = output.replace(/{%productQuantity%}/g, product.quantity);
  output = output.replace(/{%productDescription%}/g, product.description);
  output = output.replace(/{%productNutrient%}/g, product.nutrients);
  output = output.replace(/{%productId%}/g, product.id);
  if (!product.organic) output = output.replace(/{%organic%}/g, "not-organic");
  return output;
};
