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

// SOCKET EVENTS

socket.on("get_products", (products) => {
  let productList = "";
  products.forEach(({ title, description, price, stock, category, status }) => {
    productList += `
    <tr>
      <td>${title}</td>
      <td>${description}</td>
      <td>${price}</td>
      <td>${stock}</td>
      <td>${category}</td>
      <td>${status}</td>
    </tr>
    `;
  });
  productListElement.innerHTML = productList;
});
