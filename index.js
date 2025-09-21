
        // Base de datos de expansiones
        const expansions = [
            { id: 'all', name: 'Todas las Expansiones', image: 'https://icon-library.com/images/pokeball-icon-png/pokeball-icon-png-2.jpg' },
            { id: 'swsh4', name: 'Oscuro Iluminado', image: 'https://images.pokemontcg.io/swsh4/symbol.png' },
            { id: 'swsh9', name: 'Vínculo de Sangre', image: 'https://images.pokemontcg.io/swsh9/symbol.png' },
            { id: 'sm10', name: 'Unificación', image: 'https://images.pokemontcg.io/sm10/symbol.png' },
            { id: 'xy2', name: 'Destellos', image: 'https://images.pokemontcg.io/xy2/symbol.png' },
            { id: 'dp5', name: 'Ráfaga de Triumph', image: 'https://images.pokemontcg.io/dp5/symbol.png' },
            { id: 'ex13', name: 'Destino Final', image: 'https://images.pokemontcg.io/ex13/symbol.png' },
            { id: 'swsh5', name: 'Estallido de Leyendas', image: 'https://images.pokemontcg.io/swsh5/symbol.png' },
            { id: 'sm12', name: 'Equipo Up', image: 'https://images.pokemontcg.io/sm12/symbol.png' }
        ];

        // Base de datos de productos (cartas Pokémon)
        const products = [
            {
                id: 1,
                name: "Charizard VMAX",
                price: 89.99,
                image: "https://images.pokemontcg.io/swsh4/20.png",
                rarity: "Rara",
                expansion: "swsh4"
            },
            {
                id: 2,
                name: "Pikachu V",
                price: 19.99,
                image: "https://images.pokemontcg.io/swsh4/27.png",
                rarity: "Poco Común",
                expansion: "swsh4"
            },
            {
                id: 3,
                name: "Mewtwo GX",
                price: 34.99,
                image: "https://images.pokemontcg.io/sm10/78.png",
                rarity: "Rara",
                expansion: "sm10"
            },
            {
                id: 4,
                name: "Blastoise EX",
                price: 42.50,
                image: "https://images.pokemontcg.io/xy2/30.png",
                rarity: "Rara",
                expansion: "xy2"
            },
            {
                id: 5,
                name: "Gengar V",
                price: 27.99,
                image: "https://images.pokemontcg.io/swsh4/66.png",
                rarity: "Poco Común",
                expansion: "swsh4"
            },
            {
                id: 6,
                name: "Lucario LV.X",
                price: 55.00,
                image: "https://images.pokemontcg.io/dp5/9.png",
                rarity: "Ultra Rara",
                expansion: "dp5"
            },
            {
                id: 7,
                name: "Umbreon Gold Star",
                price: 120.00,
                image: "https://images.pokemontcg.io/ex13/17.png",
                rarity: "Ultra Rara",
                expansion: "ex13"
            },
            {
                id: 8,
                name: "Rayquaza EX",
                price: 38.75,
                image: "https://images.pokemontcg.io/xy2/60.png",
                rarity: "Rara",
                expansion: "xy2"
            },
            {
                id: 9,
                name: "Zacian V",
                price: 22.50,
                image: "https://images.pokemontcg.io/swsh9/16.png",
                rarity: "Rara",
                expansion: "swsh9"
            },
            {
                id: 10,
                name: "Eevee GX",
                price: 18.99,
                image: "https://images.pokemontcg.io/sm10/1.png",
                rarity: "Poco Común",
                expansion: "sm10"
            },
            {
                id: 11,
                name: "Greninja BREAK",
                price: 31.25,
                image: "https://images.pokemontcg.io/xy2/41.png",
                rarity: "Rara",
                expansion: "xy2"
            },
            {
                id: 12,
                name: "Dialga LV.X",
                price: 67.80,
                image: "https://images.pokemontcg.io/dp5/1.png",
                rarity: "Ultra Rara",
                expansion: "dp5"
            }
        ];

        // Variables globales
        let cart = [];
        let currentExpansion = 'all';
        let expansionScrollPosition = 0;
        const expansionsGrid = document.getElementById('expansions-grid');
        const cartModal = document.getElementById('cart-modal');
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const productGrid = document.getElementById('product-grid');
        const overlay = document.getElementById('overlay');

        // Inicializar la tienda
        function initStore() {
            renderExpansions();
            renderProducts();
            loadCartFromStorage();
            updateCartUI();
            
            // Event listeners
            document.getElementById('cart-icon').addEventListener('click', openCart);
            document.getElementById('close-cart').addEventListener('click', closeCart);
            document.getElementById('checkout-btn').addEventListener('click', checkout);
            document.getElementById('prev-expansion').addEventListener('click', scrollExpansionsLeft);
            document.getElementById('next-expansion').addEventListener('click', scrollExpansionsRight);
            overlay.addEventListener('click', closeCart);
        }

        // Renderizar expansiones
        function renderExpansions() {
            let expansionsHTML = '';
            
            expansions.forEach(expansion => {
                const isActive = expansion.id === currentExpansion ? 'active' : '';
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
            document.querySelectorAll('.expansion-item').forEach(item => {
                item.addEventListener('click', filterByExpansion);
            });
        }

        // Filtrar por expansión
        function filterByExpansion(e) {
            const expansionId = e.currentTarget.getAttribute('data-expansion');
            currentExpansion = expansionId;
            
            // Actualizar la clase activa
            document.querySelectorAll('.expansion-item').forEach(item => {
                if (item.getAttribute('data-expansion') === expansionId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // Renderizar productos filtrados
            renderProducts();
        }

        // Scroll de expansiones a la izquierda
        function scrollExpansionsLeft() {
            const containerWidth = document.querySelector('.expansions-container').offsetWidth;
            expansionScrollPosition = Math.max(0, expansionScrollPosition - containerWidth / 2);
            expansionsGrid.style.transform = `translateX(-${expansionScrollPosition}px)`;
        }

        // Scroll de expansiones a la derecha
        function scrollExpansionsRight() {
            const containerWidth = document.querySelector('.expansions-container').offsetWidth;
            const gridWidth = expansionsGrid.scrollWidth;
            expansionScrollPosition = Math.min(gridWidth - containerWidth, expansionScrollPosition + containerWidth / 2);
            expansionsGrid.style.transform = `translateX(-${expansionScrollPosition}px)`;
        }

        // Renderizar productos
        function renderProducts() {
            let productsHTML = '';
            
            // Filtrar productos si es necesario
            const filteredProducts = currentExpansion === 'all' 
                ? products 
                : products.filter(product => product.expansion === currentExpansion);
            
            if (filteredProducts.length === 0) {
                productsHTML = '<p class="no-products">No hay productos disponibles para esta expansión.</p>';
            } else {
                filteredProducts.forEach(product => {
                    const expansionName = expansions.find(e => e.id === product.expansion)?.name || product.expansion;
                    
                    productsHTML += `
                        <div class="product-card">
                            <div class="product-image">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${product.name}</h3>
                                <div class="product-expansion">${expansionName}</div>
                                <div class="product-price">$${product.price.toFixed(2)}</div>
                                <button class="add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
                            </div>
                        </div>
                    `;
                });
            }
            
            productGrid.innerHTML = productsHTML;
            
            // Añadir event listeners a los botones
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        }

        // Abrir carrito
        function openCart() {
            cartModal.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Cerrar carrito
        function closeCart() {
            cartModal.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Añadir producto al carrito
        function addToCart(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            if (!product) return;
            
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
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
        function updateCartUI() {
            // Actualizar contador
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Actualizar items del carrito
            let itemsHTML = '';
            let total = 0;
            
            if (cart.length === 0) {
                itemsHTML = '<p>Tu carrito está vacío</p>';
            } else {
                cart.forEach(item => {
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
                                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                                    <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
            
            cartItems.innerHTML = itemsHTML;
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
            
            // Añadir event listeners a los botones del carrito
            document.querySelectorAll('.quantity-btn.increase').forEach(button => {
                button.addEventListener('click', increaseQuantity);
            });
            
            document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
                button.addEventListener('click', decreaseQuantity);
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeItem);
            });
            
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', changeQuantity);
            });
        }

        // Aumentar cantidad
        function increaseQuantity(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                item.quantity += 1;
                updateCartUI();
                saveCartToStorage();
            }
        }

        // Disminuir cantidad
        function decreaseQuantity(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                updateCartUI();
                saveCartToStorage();
            }
        }

        // Cambiar cantidad manualmente
        function changeQuantity(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            const newQuantity = parseInt(e.target.value);
            
            if (item && newQuantity > 0) {
                item.quantity = newQuantity;
                updateCartUI();
                saveCartToStorage();
            }
        }

        // Eliminar item
        function removeItem(e) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
            saveCartToStorage();
        }

        // Finalizar compra
        function checkout() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            alert('¡Gracias por tu compra! Serás redirigido para completar el pago.');
            cart = [];
            updateCartUI();
            saveCartToStorage();
            closeCart();
        }

        // Guardar carrito en localStorage
        function saveCartToStorage() {
            localStorage.setItem('pokemonCart', JSON.stringify(cart));
        }

        // Cargar carrito desde localStorage
        function loadCartFromStorage() {
            const savedCart = localStorage.getItem('pokemonCart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
        }

        // Inicializar la tienda cuando se cargue el DOM
        document.addEventListener('DOMContentLoaded', initStore);
    