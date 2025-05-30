import { getData } from "../utils/httpreq.js";
import { getCookie } from "../utils/cookie.js";
import { closeModal, showModal } from "../utils/modal.js";
import { shortenText } from "../utils/stringfunc.js";
import { addToCart } from "../utils/cartState.js";

const loginButton = document.getElementById("login-button");
const dashboardButton = document.getElementById("dashboard-button");
const allCards = document.getElementById("all-cards");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const filterList = document.querySelectorAll("li");
const modalButton = document.getElementById("modal-button");
const cartCount = document.getElementById("cart-count");

let productsData = null;
let searchedText = "";
let category = "all";

const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }
  productsData = await getData("products");
  showProducts(productsData);
  updateCartCount();
};

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
};

const showProducts = (data) => {
  allCards.innerHTML = "";
  data.forEach((product) => {
    const cardJSX = `
    <div class="card">
      <img alt="${shortenText(product.title)}" src=${product.image} />
      <h4>${shortenText(product.title)}</h4>
      <div class="rating">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        <p>${product.rating.rate}</P>
      </div>
      <div class="count">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </svg>
        <p>${product.rating.count}</p>
      </div>
      <div class="price">
        <p>$ ${product.price}</p>
      </div>
      <button onclick="window.addToCartHandler(${JSON.stringify(product).replace(/"/g, '&quot;')})">
        Add to Cart
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
        </svg>
      </button>
    </div>
  `;
    allCards.innerHTML += cardJSX;
  });
};

window.addToCartHandler = (product) => {
  addToCart(product);
  updateCartCount();
  showModal('Item added to cart successfully!');
};

const searchHandler = () => {
  searchedText = searchInput.value.trim().toLowerCase();
  filteringproducts();
};

const filterHandler = (event) => {
  category = event.target.innerText.toLowerCase();
  filterList.forEach((li) => {
    if (category === li.innerText.toLowerCase()) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });
  filteringproducts();
};

const filteringproducts = () => {
  const filteredProducts = productsData.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(searchedText);
    } else {
      return (
        product.title.toLowerCase().includes(searchedText) &&
        product.category === category
      );
    }
  });
  showProducts(filteredProducts);
};

window.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
modalButton.addEventListener("click", closeModal);
filterList.forEach((li) => li.addEventListener("click", filterHandler));