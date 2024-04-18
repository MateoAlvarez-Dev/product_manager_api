const pathLib = require('path');
const fs = require('fs');


class Product{
    constructor(title, description, price, thumbnail, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
        this.code;
    }

    setCode(productArray){
        this.code = productArray.length + 1;
    }
}

class ProductManager{
    constructor(){
        this.path = pathLib.join("./", "db", "persistence.json");
    }

    getProducts(){
        return JSON.parse(fs.readFileSync(this.path, { encoding: 'utf-8' }));
    }

    getProductByCode(code){
        let products = this.getProducts();
        let findProduct = products.findIndex(el => el.code === code);
        return (findProduct >= 0) ? products[findProduct] : { error: "Not Found" };
    }

    addProduct(product){
        let products = this.getProducts();
        let validationError = this.validateFields(product);

        if(validationError !== ""){
            console.log(`ERROR -> ${validationError}`);
        }else{
            product.setCode(products);
            products.push(product);
            this.saveProducts(products);
            console.log("Product Added");
        }

    }

    updateProduct(id, newProduct){
        let products = this.getProducts();
        let findProduct = products.findIndex(p => p.code === id);
        
        if(findProduct < 0){ 
            console.log("Product not found");
            return;
        }

        newProduct.setCode(id);
        products[findProduct] = newProduct;

        this.saveProducts(products);

        console.log("Product Updated.");
    }

    deleteProduct(id){
        let products = this.getProducts();
        let findProduct = products.findIndex(p => p.code === id);

        if(findProduct < 0){
            console.log("Product not found.");
            return;
        }

        products.splice(findProduct, 1);

        this.saveProducts(products);

        console.log("Product Deleted.");
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