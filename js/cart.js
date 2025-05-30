import { getCart, removeFromCart, updateQuantity, getCartTotal } from '../utils/cartState.js';
import { showModal, closeModal } from '../utils/modal.js';

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const modalButton = document.getElementById('modal-button');

const renderCart = () => {
    const cart = getCart();
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="window.decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="window.increaseQuantity(${item.id})">+</button>
            </div>
            <button onclick="window.removeItem(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalElement.textContent = getCartTotal().toFixed(2);
};

window.decreaseQuantity = (productId) => {
    const item = getCart().find(item => item.id === productId);
    if (item) {
        updateQuantity(productId, item.quantity - 1);
        renderCart();
    }
};

window.increaseQuantity = (productId) => {
    const item = getCart().find(item => item.id === productId);
    if (item) {
        updateQuantity(productId, item.quantity + 1);
        renderCart();
    }
};

window.removeItem = (productId) => {
    removeFromCart(productId);
    renderCart();
};

const checkout = () => {
    const cart = getCart();
    if (cart.length === 0) {
        showModal('Your cart is empty!');
        return;
    }
    showModal('Thank you for your purchase!');
    localStorage.removeItem('cart');
    renderCart();
};

window.addEventListener('DOMContentLoaded', renderCart);
checkoutButton.addEventListener('click', checkout);
modalButton.addEventListener('click', closeModal);