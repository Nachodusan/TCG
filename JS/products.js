import { products } from "./data.js";
import { expansions } from "./data.js";
import { currentExpansion } from "./expansions.js";
import { addToCart } from "./cart.js";

const productGrid = document.getElementById("product-grid");

// Renderizar productos
export function renderProducts() {
  let productsHTML = "";

  // Filtrar productos si es necesario
  const filteredProducts =
    currentExpansion === "all"
      ? products
      : products.filter((product) => product.expansion === currentExpansion);

  if (filteredProducts.length === 0) {
    productsHTML =
      '<p class="no-products">No hay productos disponibles para esta expansión.</p>';
  } else {
    filteredProducts.forEach((product) => {
      const expansionName =
        expansions.find((e) => e.id === product.expansion)?.name ||
        product.expansion;

      productsHTML += `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-expansion">${expansionName}</div>
                        <div class="product-price">$${product.price.toFixed(
                          2
                        )}</div>
                        <button class="add-to-cart" data-id="${
                          product.id
                        }">Añadir al Carrito</button>
                    </div>
                </div>
            `;
    });
  }

  productGrid.innerHTML = productsHTML;

  // Añadir event listeners a los botones
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}
