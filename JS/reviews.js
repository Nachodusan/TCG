const reviews = [
  {
    name: "Carlos M.",
    rating: 5,
    text: "Excelente servicio, las cartas llegaron en perfecto estado y muy rápido.",
  },
  {
    name: "Ana P.",
    rating: 4,
    text: "Muy buena atención, aunque me gustaría ver más variedad en expansiones.",
  },
  {
    name: "Luis R.",
    rating: 5,
    text: "La mejor tienda online de TCG que he probado, 100% recomendada.",
  },
];

function renderReviews() {
  const container = document.querySelector(".reviews__list");
  container.innerHTML = reviews
    .map(
      (r) => `
    <article class="review">
      <h3 class="review__name">${r.name}</h3>
      <div class="review__rating">${"⭐".repeat(r.rating)}</div>
      <p class="review__text">${r.text}</p>
    </article>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", renderReviews);
