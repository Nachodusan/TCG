import { initStore } from "./store.js";
// Inicializar la tienda cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", initStore);

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-theme');
  const iconImg = document.getElementById('theme-icon');
  // Cambia el icono según el tema guardado (invertido)
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    iconImg.src = 'images/lightbulb-fill.svg';
  } else {
    iconImg.src = 'images/lightbulb.svg';
  }
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    iconImg.src = isLight ? 'images/lightbulb-fill.svg' : 'images/lightbulb.svg';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
});

