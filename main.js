const productSect = document.getElementById("products__sect");

const initialProducts = JSON.parse(localStorage.getItem("products"));

productSect.innerHTML =
  Array.isArray(initialProducts) &&
  initialProducts.map((product) => {
    return `
     <div class="card">
          <div>
            <img
            class="img__prod"
              src=${product.url}
              alt=""
              srcset=""
            />
          </div>

          <div class="info__large">
            <span class="info">${product.status} </span>
            <p>${product.products__name}</p>
          </div>

          <p>
        ${product.description}
          </p>

          <button onclick="addToCart(${product.id})"  class="cart__btn">Cart(0)</button>
            <button id="cartRemove" onclick="removeProduct(${product.id})"  class="cart__btn">Remove Product</button>
        </div>

    `;
  });

// add product
const name = document.getElementById("name");
const description = document.getElementById("description");
const quantity = document.getElementById("quantity");
const url = document.getElementById("url");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let quantity = document.getElementById("quantity").value;
  let url = document.getElementById("url").value;
  const id = Math.ceil(Math.random() * 100);
  const initialData = [];
  try {
    const newProd = {
      id,
      products__name: name,
      status: "new",
      description,
      quantity,
      url,
    };
    const existingProducts = JSON.parse(localStorage.getItem("products"));
    if (Array.isArray(existingProducts)) {
      const newExistingProductsData = [...existingProducts];
      newExistingProductsData.push(newProd);
      localStorage.setItem("products", JSON.stringify(newExistingProductsData));
      window.location.reload();
    } else {
      initialData.push(newProd);

      localStorage.setItem("products", JSON.stringify(initialData));
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
});
const cart = [];

const existingCartItems = JSON.parse(localStorage.getItem("cart"));
const existingProducts = JSON.parse(localStorage.getItem("products"));
function addToCart(product) {
  // check if product exists in cart
  // find  that product in the local storage
  if (Array.isArray(existingCartItems)) {
    const productsInLocalStorage = JSON.parse(localStorage.getItem("products"));

    const foundProd = productsInLocalStorage.find(
      (prod) => prod.id === product
    );
    // prevent if product exists in cart
    const inCart = existingCartItems.findIndex((prod) => prod.id == product);
    if (inCart !== -1) {
      document.getElementById("text-top").innerText = `product exists in cart`;
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const newCartItems = [...existingCartItems];
    newCartItems.push(foundProd);

    localStorage.setItem("cart", JSON.stringify(newCartItems));
    window.location.reload();
  } else {
    let data = [];
    const prod = existingProducts.find((prod) => prod.id === product);

    data.push(prod);

    localStorage.setItem("cart", JSON.stringify(data));
  }
  window.location.reload();
}

if (Array.isArray(existingCartItems)) {
  document.getElementById(
    "text-top"
  ).innerText = `Cart (${existingCartItems.length})`;
}

function removeProduct(productId) {
  const newProductsItems = existingProducts.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem("products", JSON.stringify(newProductsItems));
  window.location.reload();
}

function removeFromCart(productId) {
  const newCartItems = existingCartItems.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem("products", JSON.stringify(newCartItems));
  window.location.reload();
}

const modal__items = document.getElementById("modal__items");

modal__items.innerHTML =
  Array.isArray(existingCartItems) &&
  existingCartItems.map((product) => {
    return `
     <div class="card__item">
          <div>
            <img
              src=${product.url}
              alt=""
              class="img__cart"
              srcset=""
            />
          </div>

          <div class="info__large">
            <span class="info">${product.status} </span>
            <p>${product.products__name}</p>
          </div>

          <p>
        ${product.description}
          </p>
            <button id="cartRemove" onclick="removeFromCart(${product.id})"  class="cart__btn">Remove from cart</button>
        </div>

    `;
  });

document.getElementById("bar").onclick = function () {
  document.querySelector(".modal").classList.toggle("toggle");
};

document.getElementById("modal__btn").onclick = function () {
  document.querySelector(".modal").classList.toggle("toggle");
};
