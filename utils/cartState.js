let cart = [];

const addToCart = (product) => {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveToLocalStorage();
};

const removeFromCart = (productId) => {
  cart = cart.filter(item => item.id !== productId);
  saveToLocalStorage();
};

const updateQuantity = (productId, quantity) => {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    if (quantity <= 0) {
      removeFromCart(productId);
    }
  }
  saveToLocalStorage();
};

const getCart = () => {
  loadFromLocalStorage();
  return cart;
};

const getCartTotal = () => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const saveToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const loadFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
};

export { addToCart, removeFromCart, updateQuantity, getCart, getCartTotal };