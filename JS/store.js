import {
  renderExpansions,
  scrollExpansionsLeft,
  scrollExpansionsRight,
  filterByExpansion,
} from "./expansions.js";
import { renderProducts } from "./products.js";
import {
  openCart,
  closeCart,
  checkout,
  loadCartFromStorage,
  updateCartUI,
} from "./cart.js";

// Inicializar la tienda
export function initStore() {
  renderExpansions();
  renderProducts();
  loadCartFromStorage();
  updateCartUI();

  // Event listeners
  document.getElementById("cart-icon").addEventListener("click", openCart);
  document.getElementById("close-cart").addEventListener("click", closeCart);
  document.getElementById("checkout-btn").addEventListener("click", checkout);
  document
    .getElementById("prev-expansion")
    .addEventListener("click", scrollExpansionsLeft);
  document
    .getElementById("next-expansion")
    .addEventListener("click", scrollExpansionsRight);
  document.getElementById("overlay").addEventListener("click", closeCart);

  // Añadir event listener para cambios de expansión
  document.querySelectorAll(".expansion-item").forEach((item) => {
    item.addEventListener("click", function () {
      filterByExpansion({ currentTarget: this });
      renderProducts();
    });
  });
}
