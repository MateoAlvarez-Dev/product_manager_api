const socket = io();
const form = document.querySelector("#product_form");
const productListElement = document.querySelector("#product_list");

function sendForm(ev) {
  ev.preventDefault();
  let { title, price, stock, category, thumbnail, description } = ev.target;
  socket.emit("new_product", {
    title: title.value,
    price: price.value,
    stock: stock.value,
    category: category.value,
    thumbnail: thumbnail.value,
    description: description.value,
    status: true,
  });
}

function deleteProduct(ev) {
  let productCode = ev.target.getAttribute("data-product-code");
  socket.emit("delete_product", Number(productCode));
}

// SOCKET EVENTS

socket.on("get_products", (products) => {
  let productList = "";
  products.forEach(({ title, description, price, stock, category, status, code }) => {
    productList += `
    <tr>
      <td>${code}</td>
      <td>${title}</td>
      <td>${description}</td>
      <td>$${price}</td>
      <td>${stock}</td>
      <td>${category}</td>
      <td>${status}</td>
      <td><button class="btn btn-danger" data-product-code="${code}" onclick="deleteProduct(event)">Delete</button></td>
    </tr>
    `;
  });
  productListElement.innerHTML = productList;
});

// TESTING

function autoFill() {
  let vals = ["Example", 9999, 15, "Auto Fill", "https://example.com", "This is an example"];
  let fields = ["title", "price", "stock", "category", "thumbnail", "description"];

  fields.forEach((field, index) => {
    form[field].value = vals[index];
  });
}
