import { products } from "./data.js";

// Variables globales
export let cart = [];

// Elementos del DOM
const cartModal = document.getElementById("cart-modal");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const overlay = document.getElementById("overlay");
const closeCartBtn = document.getElementById("close-cart");

// Abrir carrito
export function openCart() {
  cartModal.classList.add("open");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  updateCartUI();
}

// Cerrar carrito
export function closeCart() {
  cartModal.classList.remove("open");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Eventos de cierre
if (closeCartBtn) {
  closeCartBtn.addEventListener("click", closeCart);
}
if (overlay) {
  overlay.addEventListener("click", closeCart);
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCart();
});

// Añadir producto al carrito
export function addToCart(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCartUI();
  saveCartToStorage();

  // Mostrar feedback visual
  e.target.textContent = "¡Añadido!";
  setTimeout(() => {
    e.target.textContent = "Añadir al Carrito";
  }, 1500);
}

// Actualizar interfaz del carrito
export function updateCartUI() {
  // Actualizar contador
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Actualizar items del carrito
  let itemsHTML = "";
  let total = 0;

  if (cart.length === 0) {
    itemsHTML = "<p>Tu carrito está vacío</p>";
  } else {
    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      itemsHTML += `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease" data-id="${
                item.id
              }">-</button>
              <input type="number" class="quantity-input" value="${
                item.quantity
              }" min="1" data-id="${item.id}">
              <button class="quantity-btn increase" data-id="${
                item.id
              }">+</button>
              <button class="remove-item" data-id="${
                item.id
              }"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      `;
    });
  }

  cartItems.innerHTML = itemsHTML;
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Añadir event listeners a los botones del carrito
  document.querySelectorAll(".quantity-btn.increase").forEach((button) => {
    button.addEventListener("click", increaseQuantity);
  });

  document.querySelectorAll(".quantity-btn.decrease").forEach((button) => {
    button.addEventListener("click", decreaseQuantity);
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItem);
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", changeQuantity);
  });
}

// Aumentar cantidad
function increaseQuantity(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += 1;
    updateCartUI();
    saveCartToStorage();
  }
}

// Disminuir cantidad
function decreaseQuantity(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  const item = cart.find((item) => item.id === productId);

  if (item && item.quantity > 1) {
    item.quantity -= 1;
    updateCartUI();
    saveCartToStorage();
  }
}

// Cambiar cantidad manualmente
function changeQuantity(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  const item = cart.find((item) => item.id === productId);
  const newQuantity = parseInt(e.target.value);

  if (item && newQuantity > 0) {
    item.quantity = newQuantity;
    updateCartUI();
    saveCartToStorage();
  }
}

// Eliminar item
function removeItem(e) {
  const productId = parseInt(
    e.target.closest("button").getAttribute("data-id")
  );
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
  saveCartToStorage();
}

// Finalizar compra
export function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  alert("¡Gracias por tu compra! Serás redirigido para completar el pago.");
  cart = [];
  updateCartUI();
  saveCartToStorage();
  closeCart();
}

// Guardar carrito en localStorage
export function saveCartToStorage() {
  localStorage.setItem("pokemonCart", JSON.stringify(cart));
}

// Cargar carrito desde localStorage
export function loadCartFromStorage() {
  const savedCart = localStorage.getItem("pokemonCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}
