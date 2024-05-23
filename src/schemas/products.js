/**
 * @deprecated this Object will be deleted soon. Will be replaced by Mongoose Schemas
 */
class Product{
    constructor({title, description, price, stock, category, thumbnail, status = true}){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
        this.status = status;
        this.category = category;
        this.code;
    }

    setCode(productArray){
        this.code = productArray.length + 1;
    }
}

module.exports = Product;