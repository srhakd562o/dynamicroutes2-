const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      // Provide a default value (empty array) if there's an error reading the file
      cb([]);
    } else {
      try {
        // Attempt to parse the file content as JSON
        const products = JSON.parse(fileContent);
        cb(products);
      } catch (error) {
        // Handle JSON parsing errors
        console.error('Error parsing JSON:', error);
        cb([]);
      }
    }
  });
};


module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() { 
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      }); 
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id,cb){
    getProductsFromFile(products =>{
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
