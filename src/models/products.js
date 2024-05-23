const fs = require('fs');
const Product = require('../schemas/products');

/**
 * @deprecated this functionality will be deleted soon. Will be replaced by Mongoose Models
 */
class ProductManager{
    constructor(path){
        this.path = path;
    }

    getProducts(){
        return JSON.parse(fs.readFileSync(this.path, { encoding: 'utf-8' }));
    }

    getProductByCode(code){
        let products = this.getProducts();
        let findProduct = products.findIndex(el => el.code === code);
        return (findProduct >= 0) ? products[findProduct] : null;
    }

    addProduct(data){
        let product = new Product(data);
        let products = this.getProducts();
        let validationError = this.validateFields(product);

        if(validationError !== ""){
            return false;
        }else{
            product.setCode(products);
            products.push(product);
            this.saveProducts(products);
            return product;
        }

    }

    updateProduct(id, data){
        let newProduct = new Product(data);
        let products = this.getProducts();
        let findProduct = products.findIndex(p => p.code === id);
        
        if(findProduct < 0){ 
            return false;
        }

        newProduct.setCode(id);
        products[findProduct] = newProduct;

        this.saveProducts(products);

      console.log("Product Updated.");
      
      return true;
    }

    deleteProduct(id){
        let products = this.getProducts();
        let findProduct = products.findIndex(p => p.code === id);

        if(findProduct < 0){
            return false;
        }

        products.splice(findProduct, 1);

        this.saveProducts(products);

        return true;
    }

    saveProducts(products){
        fs.writeFileSync(this.path, JSON.stringify(products));
    }

    validateFields(product){
        let message = "";

        if(product.title === "") message = "You need to provide a title";

        else if(product.description === "") message = "You need to provide a description";

        else if(!product.price || isNaN(product.price)) message = "You need to provide a valid price";

        else if(product.thumbnail === "") message = "You need to provide a valid thumbnail url";

        else if(!product.stock || isNaN(product.stock)) message = "You need to provide a valid stock number";

        return message;
    }
}

module.exports = {
    Product,
    ProductManager
}