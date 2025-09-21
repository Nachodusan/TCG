import { expansions } from "./data.js";

// Variables globales
export let currentExpansion = "all";
let expansionScrollPosition = 0;
const expansionsGrid = document.getElementById("expansions-grid");

// Renderizar expansiones
export function renderExpansions() {
  let expansionsHTML = "";

  expansions.forEach((expansion) => {
    const isActive = expansion.id === currentExpansion ? "active" : "";
    expansionsHTML += `
            <div class="expansion-item ${isActive}" data-expansion="${expansion.id}">
                <div class="expansion-image">
                    <img src="${expansion.image}" alt="${expansion.name}">
                </div>
                <div class="expansion-name">${expansion.name}</div>
            </div>
        `;
  });

  expansionsGrid.innerHTML = expansionsHTML;

  // Añadir event listeners a las expansiones
  document.querySelectorAll(".expansion-item").forEach((item) => {
    item.addEventListener("click", filterByExpansion);
  });
}

// Filtrar por expansión
export function filterByExpansion(e) {
  const expansionId = e.currentTarget.getAttribute("data-expansion");
  currentExpansion = expansionId;

  // Actualizar la clase activa
  document.querySelectorAll(".expansion-item").forEach((item) => {
    if (item.getAttribute("data-expansion") === expansionId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Scroll de expansiones a la izquierda
export function scrollExpansionsLeft() {
  const containerWidth = document.querySelector(
    ".expansions-container"
  ).offsetWidth;
  expansionScrollPosition = Math.max(
    0,
    expansionScrollPosition - containerWidth / 2
  );
  expansionsGrid.style.transform = `translateX(-${expansionScrollPosition}px)`;
}

// Scroll de expansiones a la derecha
export function scrollExpansionsRight() {
  const containerWidth = document.querySelector(
    ".expansions-container"
  ).offsetWidth;
  const gridWidth = expansionsGrid.scrollWidth;
  expansionScrollPosition = Math.min(
    gridWidth - containerWidth,
    expansionScrollPosition + containerWidth / 2
  );
  expansionsGrid.style.transform = `translateX(-${expansionScrollPosition}px)`;
}
