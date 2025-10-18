// script.js
/**
 * ZeSt - Telegram Web App
 * Магазин премиальных энергетических напитков
 * @version 2.0.0
 */

// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
let cart = [];
let user = null;
let products = [];
let services = [];
let currentPage = 'catalog';

// Configuration
const CONFIG = {
    GOOGLE_SHEETS_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL',
    CLUB_SUBSCRIPTION_PRICE: 350,
    DELIVERY_PRICES: {
        'none': 0,
        'iskateli': 15,
        'naryan-mar': 50
    },
    EXACT_TIME_PRICE: 10
};

// Utility functions
const Utils = {
    // Debounce function for search
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format price
    formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price);
    },

    // Format phone number
    formatPhoneNumber(phone) {
        if (!phone) return 'Не указан';
        return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Show toast notification
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideInDown 0.3s ease-out reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// Storage management
const Storage = {
    // Cart storage
    saveCart() {
        try {
            localStorage.setItem('zest_cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart:', error);
            Utils.showToast('Ошибка сохранения корзины', 'error');
        }
    },

    loadCart() {
        try {
            const savedCart = localStorage.getItem('zest_cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            Utils.showToast('Ошибка загрузки корзины', 'error');
        }
    },

    // User storage
    saveUser() {
        try {
            localStorage.setItem('zest_user', JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user:', error);
        }
    },

    loadUser() {
        try {
            const savedUser = localStorage.getItem('zest_user');
            if (savedUser) {
                user = JSON.parse(savedUser);
            }
        } catch (error) {
            console.error('Error loading user:', error);
        }
    },

    // Subscription storage
    saveSubscription(subscription) {
        try {
            localStorage.setItem('zest_club_subscription', JSON.stringify(subscription));
        } catch (error) {
            console.error('Error saving subscription:', error);
        }
    },

    loadSubscription() {
        try {
            const subscription = localStorage.getItem('zest_club_subscription');
            return subscription ? JSON.parse(subscription) : null;
        } catch (error) {
            console.error('Error loading subscription:', error);
            return null;
        }
    }
};

// API functions
const API = {
    async fetchProducts() {
        try {
            // In a real app, this would be your Google Apps Script URL
            if (CONFIG.GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
                const response = await fetch(`${CONFIG.GOOGLE_SHEETS_URL}?action=getProducts`);
                if (!response.ok) throw new Error('Network response was not ok');
                return await response.json();
            } else {
                // Fallback to mock data
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
                return this.getMockProducts();
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            Utils.showToast('Ошибка загрузки товаров', 'error');
            return this.getMockProducts();
        }
    },

    async fetchServices() {
        try {
            if (CONFIG.GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
                const response = await fetch(`${CONFIG.GOOGLE_SHEETS_URL}?action=getServices`);
                if (!response.ok) throw new Error('Network response was not ok');
                return await response.json();
            } else {
                await new Promise(resolve => setTimeout(resolve, 500));
                return this.getMockServices();
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            return this.getMockServices();
        }
    },

    getMockProducts() {
        return [
            {
                id: '1',
                name: 'Red Bull Energy Drink',
                price: 150,
                image: '🔴',
                category: 'energy',
                description: 'Знаменитый энергетический напиток с таурином и кофеином',
                inStock: true,
                volume: '250ml'
            },
            {
                id: '2',
                name: 'Burn Original',
                price: 120,
                image: '🔥',
                category: 'energy',
                description: 'Энергетик с ярким вкусом и мощным зарядом энергии',
                inStock: true,
                volume: '250ml'
            },
            {
                id: '3',
                name: 'Coca-Cola',
                price: 80,
                image: '🥤',
                category: 'soft',
                description: 'Классический газированный напиток',
                inStock: true,
                volume: '330ml'
            },
            {
                id: '4',
                name: 'Adrenaline Rush',
                price: 130,
                image: '⚡',
                category: 'energy',
                description: 'Энергетик для экстремальных ситуаций',
                inStock: false,
                volume: '250ml'
            },
            {
                id: '5',
                name: 'Aqua Minerale',
                price: 50,
                image: '💧',
                category: 'water',
                description: 'Очищенная питьевая вода',
                inStock: true,
                volume: '500ml'
            },
            {
                id: '6',
                name: 'Monster Energy',
                price: 160,
                image: '👹',
                category: 'energy',
                description: 'Легендарный энергетик с уникальным вкусом',
                inStock: true,
                volume: '500ml'
            },
            {
                id: '7',
                name: 'Pepsi',
                price: 75,
                image: '🥤',
                category: 'soft',
                description: 'Популярный газированный напиток',
                inStock: true,
                volume: '330ml'
            },
            {
                id: '8',
                name: 'Fanta',
                price: 70,
                image: '🍊',
                category: 'soft',
                description: 'Апельсиновый газированный напиток',
                inStock: true,
                volume: '330ml'
            }
        ];
    },

    getMockServices() {
        return [
            {
                id: '1',
                name: 'Холодная доставка',
                price: 20,
                type: 'delivery',
                description: 'Доставка в термопакете для сохранения температуры'
            },
            {
                id: '2',
                name: 'Подарочная упаковка',
                price: 30,
                type: 'packaging',
                description: 'Специальная праздничная упаковка'
            },
            {
                id: '3',
                name: 'Срочная доставка',
                price: 50,
                type: 'delivery',
                description: 'Доставка в течение 30 минут'
            },
            {
                id: '4',
                name: 'Персональная открытка',
                price: 15,
                type: 'packaging',
                description: 'Поздравительная открытка с вашим текстом'
            }
        ];
    }
};

// Cart management
const CartManager = {
    addItem(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) {
            Utils.showToast('Товар не найден', 'error');
            return false;
        }

        if (!product.inStock) {
            Utils.showToast('Этот товар временно отсутствует', 'warning');
            return false;
        }

        const existingItem = cart.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                productId: productId,
                quantity: quantity,
                name: product.name,
                price: product.price,
                image: product.image,
                addedAt: new Date().toISOString()
            });
        }
        
        Storage.saveCart();
        this.updateUI();
        Utils.showToast(`${product.name} добавлен в корзину`, 'success');
        
        return true;
    },

    updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }
        
        const item = cart.find(item => item.productId === productId);
        if (item) {
            item.quantity = newQuantity;
            Storage.saveCart();
            this.updateUI();
        }
    },

    removeItem(productId) {
        const item = cart.find(item => item.productId === productId);
        if (item) {
            // Add removal animation
            const cartItemElement = document.querySelector(`[data-product-id="${productId}"]`);
            if (cartItemElement) {
                cartItemElement.classList.add('removing');
                setTimeout(() => {
                    cart = cart.filter(item => item.productId !== productId);
                    Storage.saveCart();
                    this.updateUI();
                    Utils.showToast(`${item.name} удален из корзины`, 'info');
                }, 300);
            } else {
                cart = cart.filter(item => item.productId !== productId);
                Storage.saveCart();
                this.updateUI();
                Utils.showToast(`${item.name} удален из корзины`, 'info');
            }
        }
    },

    clearCart() {
        cart = [];
        Storage.saveCart();
        this.updateUI();
    },

    getTotalItems() {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    getTotalPrice() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    updateUI() {
        // Update cart count in header
        const totalItems = this.getTotalItems();
        document.getElementById('cart-count').textContent = totalItems;
        
        // Update bottom navigation badge
        document.getElementById('bottom-cart-count').textContent = totalItems;
        
        // Update cart page
        this.renderCartItems();
        
        // Enable/disable proceed button
        document.getElementById('to-step-2').disabled = totalItems === 0;
        
        // Update products grid to reflect cart changes
        if (currentPage === 'catalog') {
            ProductManager.renderProducts();
        }
    },

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('cart-total-price');
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">🛒</span>
                    <p>Корзина пуста</p>
                    <button class="btn-secondary" data-page="catalog">Перейти в каталог</button>
                </div>
            `;
            totalPriceElement.textContent = '0';
            return;
        }
        
        let totalPrice = 0;
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.setAttribute('data-product-id', item.productId);
            itemElement.innerHTML = `
                <div class="cart-item-image">${item.image || '🥤'}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${Utils.formatPrice(item.price)}₽ × ${item.quantity} = ${Utils.formatPrice(itemTotal)}₽</div>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="CartManager.updateQuantity('${item.productId}', ${item.quantity - 1})" aria-label="Уменьшить количество">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="CartManager.updateQuantity('${item.productId}', ${item.quantity + 1})" aria-label="Увеличить количество">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        
        totalPriceElement.textContent = Utils.formatPrice(totalPrice);
    }
};

// Product management
const ProductManager = {
    async loadProducts() {
        try {
            products = await API.fetchProducts();
            this.renderProducts();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    },

    renderProducts(productsToRender = products) {
        const grid = document.getElementById('products-grid');
        
        if (productsToRender.length === 0) {
            grid.innerHTML = '<div class="loading">Товары не найдены</div>';
            return;
        }
        
        grid.innerHTML = '';
        
        productsToRender.forEach(product => {
            const cartItem = cart.find(item => item.productId === product.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            
            const productElement = document.createElement('div');
            productElement.className = `product-card ${!product.inStock ? 'out-of-stock' : ''}`;
            productElement.innerHTML = `
                ${!product.inStock ? '<div class="out-of-stock-badge">Нет в наличии</div>' : ''}
                <div class="product-image">${product.image || '🥤'}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">${Utils.formatPrice(product.price)}₽</div>
                <div class="product-volume">${product.volume || '250ml'}</div>
                <div class="product-actions">
                    ${!product.inStock ? 
                        `<button class="btn-primary" disabled>Нет в наличии</button>` :
                        quantity === 0 ? 
                            `<button class="btn-primary" onclick="CartManager.addItem('${product.id}', 1)">В корзину</button>` :
                            `<div class="quantity-controls">
                                <button class="quantity-btn" onclick="CartManager.updateQuantity('${product.id}', ${quantity - 1})" aria-label="Уменьшить количество">-</button>
                                <span class="quantity-display">${quantity}</span>
                                <button class="quantity-btn" onclick="CartManager.updateQuantity('${product.id}', ${quantity + 1})" aria-label="Увеличить количество">+</button>
                            </div>`
                    }
                </div>
            `;
            grid.appendChild(productElement);
        });
    },

    filterProducts() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        
        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                (product.description && product.description.toLowerCase().includes(searchTerm));
            const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        
        this.renderProducts(filteredProducts);
    },

    searchProducts: Utils.debounce(function() {
        ProductManager.filterProducts();
    }, 300)
};

// Services management
const ServiceManager = {
    async loadServices() {
        try {
            services = await API.fetchServices();
            this.renderServices();
        } catch (error) {
            console.error('Error loading services:', error);
        }
    },

    renderServices() {
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = '';
        
        services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'time-option';
            serviceElement.innerHTML = `
                <input type="checkbox" id="service-${service.id}" value="${service.id}">
                <label for="service-${service.id}">
                    <div class="option-content">
                        <strong>${service.name}</strong>
                        <span>${Utils.formatPrice(service.price)}₽</span>
                        ${service.description ? `<small>${service.description}</small>` : ''}
                    </div>
                    <div class="checkbox-check"></div>
                </label>
            `;
            servicesList.appendChild(serviceElement);
        });
    }
};

// User management
const UserManager = {
    handleTelegramAuth() {
        if (tg.initDataUnsafe.user) {
            user = tg.initDataUnsafe.user;
            Storage.saveUser();
            this.updateUserProfile();
            
            Utils.showToast(`Добро пожаловать, ${user.first_name || 'пользователь'}!`, 'success');
        } else {
            tg.showPopup({
                title: 'Ошибка авторизации',
                message: 'Не удалось получить данные пользователя. Пожалуйста, попробуйте еще раз.',
                buttons: [{ type: 'close' }]
            });
        }
    },

    handleLogout() {
        tg.showPopup({
            title: 'Выход из аккаунта',
            message: 'Вы уверены, что хотите выйти?',
            buttons: [
                {
                    type: 'destructive',
                    text: 'Выйти',
                    id: 'logout'
                },
                {
                    type: 'cancel',
                    id: 'cancel'
                }
            ]
        });
        
        tg.onEvent('popupClosed', (data) => {
            if (data.button_id === 'logout') {
                user = null;
                localStorage.removeItem('zest_user');
                this.updateUserProfile();
                
                Utils.showToast('Вы вышли из аккаунта', 'info');
            }
        });
    },

    updateUserProfile() {
        if (user) {
            // User is logged in
            document.getElementById('auth-section').classList.add('hidden');
            document.getElementById('profile-content').classList.remove('hidden');
            
            // Update user info in header
            document.getElementById('user-name').textContent = 
                `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Пользователь';
            document.getElementById('user-phone').textContent = 
                user.phone_number ? Utils.formatPhoneNumber(user.phone_number) : 'Телефон не указан';
            
            // Update profile details
            document.getElementById('profile-name').textContent = 
                `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Не указано';
            document.getElementById('profile-phone').textContent = 
                user.phone_number ? Utils.formatPhoneNumber(user.phone_number) : 'Не указан';
            document.getElementById('profile-username').textContent = 
                user.username ? `@${user.username}` : 'Не указан';
            document.getElementById('profile-id').textContent = user.id || 'Не доступен';
            
            // Update avatar with user photo if available
            const userAvatar = document.getElementById('user-avatar');
            if (user.photo_url) {
                userAvatar.innerHTML = `<img src="${user.photo_url}" alt="Аватар" class="user-avatar-img" onerror="this.style.display='none'">`;
            } else {
                userAvatar.innerHTML = `
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                `;
            }
        } else {
            // User is not logged in
            document.getElementById('auth-section').classList.remove('hidden');
            document.getElementById('profile-content').classList.add('hidden');
            
            // Reset user info
            document.getElementById('user-name').textContent = 'Гость';
            document.getElementById('user-phone').textContent = 'Войдите через Telegram';
            document.getElementById('user-avatar').innerHTML = `
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            `;
        }
    }
};

// Club subscription management
const ClubManager = {
    handleSubscription() {
        if (!user) {
            Utils.showToast('Для оформления подписки необходимо войти в аккаунт', 'warning');
            switchPage('profile');
            return;
        }
        
        tg.showPopup({
            title: 'ZeSt Club',
            message: `Оформление премиум подписки за ${Utils.formatPrice(CONFIG.CLUB_SUBSCRIPTION_PRICE)}₽/месяц`,
            buttons: [
                {
                    type: 'default',
                    text: 'Оформить',
                    id: 'subscribe'
                },
                {
                    type: 'cancel',
                    id: 'cancel'
                }
            ]
        });
        
        tg.onEvent('popupClosed', (data) => {
            if (data.button_id === 'subscribe') {
                this.activateSubscription();
            }
        });
    },

    activateSubscription() {
        const expiryDate = this.getNextMonthDate();
        
        // Update club status
        document.getElementById('club-status').innerHTML = 
            `<span class="status-text">Статус: Активен до ${expiryDate}</span>`;
        document.getElementById('club-status').className = 'club-status active';
        
        document.getElementById('profile-club-status').className = 'club-status-badge active';
        document.getElementById('profile-club-status').innerHTML = `
            <span class="status-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </span>
            <span class="status-text">Активен до ${expiryDate}</span>
        `;
        
        // Save subscription status
        Storage.saveSubscription({
            active: true,
            expiry: expiryDate,
            activatedAt: new Date().toISOString()
        });
        
        Utils.showToast('Премиум подписка активирована!', 'success');
    },

    getNextMonthDate() {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date.toLocaleDateString('ru-RU');
    },

    checkSubscriptionStatus() {
        const subscription = Storage.loadSubscription();
        if (subscription && subscription.active && new Date(subscription.expiry) > new Date()) {
            // Subscription is active
            document.getElementById('club-status').innerHTML = 
                `<span class="status-text">Статус: Активен до ${subscription.expiry}</span>`;
            document.getElementById('club-status').className = 'club-status active';
            
            document.getElementById('profile-club-status').className = 'club-status-badge active';
            document.getElementById('profile-club-status').innerHTML = `
                <span class="status-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </span>
                <span class="status-text">Активен до ${subscription.expiry}</span>
            `;
        }
    }
};

// Order management
const OrderManager = {
    switchCartStep(step) {
        // Update steps indicator
        document.querySelectorAll('.step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        document.querySelector(`[data-step="${step}"]`).classList.add('active');
        
        // Update steps content
        document.querySelectorAll('.cart-step').forEach(stepContent => {
            stepContent.classList.remove('active');
        });
        document.getElementById(`cart-step-${step}`).classList.add('active');
        
        // Update order summary for step 3
        if (step === 3) {
            this.updateOrderSummary();
        }
    },

    updateOrderSummary() {
        const orderSummary = document.getElementById('order-summary');
        const finalTotalElement = document.getElementById('final-total');
        
        let total = CartManager.getTotalPrice();
        let summaryHTML = '<div class="order-items">';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            summaryHTML += `
                <div class="order-item">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>${Utils.formatPrice(itemTotal)}₽</span>
                </div>
            `;
        });
        
        summaryHTML += '</div>';
        
        // Add delivery cost
        const deliveryOption = document.querySelector('input[name="delivery"]:checked');
        let deliveryCost = 0;
        
        if (deliveryOption && deliveryOption.value !== 'none') {
            deliveryCost = CONFIG.DELIVERY_PRICES[deliveryOption.value] || 0;
            
            // Add exact time cost
            if (document.getElementById('exact-time').checked) {
                deliveryCost += CONFIG.EXACT_TIME_PRICE;
            }
            
            total += deliveryCost;
            summaryHTML += `
                <div class="order-delivery">
                    <span>Доставка</span>
                    <span>${Utils.formatPrice(deliveryCost)}₽</span>
                </div>
            `;
        }
        
        // Add services cost
        const selectedServices = document.querySelectorAll('#services-list input:checked');
        let servicesCost = 0;
        
        selectedServices.forEach(serviceInput => {
            const service = services.find(s => s.id === serviceInput.value);
            if (service) {
                servicesCost += service.price;
                total += service.price;
                summaryHTML += `
                    <div class="order-service">
                        <span>${service.name}</span>
                        <span>${Utils.formatPrice(service.price)}₽</span>
                    </div>
                `;
            }
        });
        
        finalTotalElement.textContent = Utils.formatPrice(total);
        orderSummary.innerHTML = summaryHTML;
    },

    confirmOrder() {
        if (cart.length === 0) {
            Utils.showToast('Корзина пуста', 'error');
            return;
        }
        
        const total = document.getElementById('final-total').textContent;
        const deliveryOption = document.querySelector('input[name="delivery"]:checked');
        
        // Create order object
        const order = {
            id: Utils.generateId(),
            items: [...cart],
            total: total,
            delivery: deliveryOption ? deliveryOption.value : 'none',
            timestamp: new Date().toISOString(),
            user: user ? {
                id: user.id,
                name: `${user.first_name || ''} ${user.last_name || ''}`.trim()
            } : null
        };
        
        // Save order to history
        this.saveOrderToHistory(order);
        
        // Show confirmation
        tg.showPopup({
            title: 'Заказ подтвержден!',
            message: `Ваш заказ #${order.id} на сумму ${total}₽ принят в обработку. Скоро с вами свяжется оператор.`,
            buttons: [{
                type: 'close',
                id: 'close'
            }]
        });
        
        // Clear cart after successful order
        CartManager.clearCart();
        switchPage('catalog');
        
        Utils.showToast(`Заказ #${order.id} успешно оформлен!`, 'success');
    },

    saveOrderToHistory(order) {
        try {
            const orderHistory = JSON.parse(localStorage.getItem('zest_order_history') || '[]');
            orderHistory.unshift(order);
            localStorage.setItem('zest_order_history', JSON.stringify(orderHistory.slice(0, 50))); // Keep last 50 orders
        } catch (error) {
            console.error('Error saving order to history:', error);
        }
    },

    loadOrderHistory() {
        try {
            return JSON.parse(localStorage.getItem('zest_order_history') || '[]');
        } catch (error) {
            console.error('Error loading order history:', error);
            return [];
        }
    }
};

// Modal management
const ModalManager = {
    openModal(content) {
        document.getElementById('modal-product-content').innerHTML = content;
        document.getElementById('product-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    },

    closeModal() {
        document.getElementById('product-modal').classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
};

// Navigation management
const NavigationManager = {
    switchPage(pageName) {
        console.log('Switching to page:', pageName);
        currentPage = pageName;
        
        // Update bottom navigation
        document.querySelectorAll('.bottom-navigation .nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeNavButton = document.querySelector(`.bottom-navigation [data-page="${pageName}"]`);
        if (activeNavButton) {
            activeNavButton.classList.add('active');
        } else {
            console.warn('Nav button not found for page:', pageName);
        }
        
        // Update pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const activePage = document.getElementById(`${pageName}-page`);
        if (activePage) {
            activePage.classList.add('active');
        } else {
            console.warn('Page not found:', pageName);
        }
        
        // Special handling for cart page
        if (pageName === 'cart') {
            OrderManager.switchCartStep(1);
        }
        
        // Update page title for screen readers
        const pageTitles = {
            'catalog': 'Каталог товаров',
            'club': 'ZeSt Club',
            'cart': 'Корзина',
            'profile': 'Профиль'
        };
        
        document.title = `ZeSt - ${pageTitles[pageName] || 'Магазин энергетиков'}`;
        
        // Update ARIA attributes for accessibility
        this.updateAriaAttributes(pageName);
    },

    updateAriaAttributes(pageName) {
        // Update ARIA current page
        document.querySelectorAll('.bottom-navigation .nav-btn').forEach(btn => {
            const isActive = btn.dataset.page === pageName;
            btn.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    },

    setupNavigation() {
        // Bottom Navigation
        document.querySelectorAll('.bottom-navigation .nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.currentTarget.dataset.page;
                console.log('Nav button clicked, page:', page);
                this.switchPage(page);
            });
        });

        // Header cart button
        document.getElementById('cart-indicator').addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Cart indicator clicked');
            this.switchPage('cart');
        });

        // Catalog button in empty states
        document.querySelectorAll('button[data-page="catalog"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Catalog button clicked from empty state');
                this.switchPage('catalog');
            });
        });
    }
};

// Event listeners setup
function setupEventListeners() {
    // Age verification
    document.getElementById('age-confirm').addEventListener('click', () => {
        localStorage.setItem('ageVerified', 'true');
        showMainApp();
    });
    
    document.getElementById('age-deny').addEventListener('click', () => {
        tg.showPopup({
            title: 'Доступ запрещен',
            message: 'Извините, доступ к магазину разрешен только с 18 лет',
            buttons: [{ type: 'close' }]
        });
    });
    
    // Setup navigation
    NavigationManager.setupNavigation();
    
    // Cart steps navigation
    document.getElementById('to-step-2').addEventListener('click', () => OrderManager.switchCartStep(2));
    document.getElementById('to-step-3').addEventListener('click', () => OrderManager.switchCartStep(3));
    document.getElementById('back-to-step-1').addEventListener('click', () => OrderManager.switchCartStep(1));
    document.getElementById('back-to-step-2').addEventListener('click', () => OrderManager.switchCartStep(2));
    
    // Telegram auth
    document.getElementById('telegram-auth').addEventListener('click', () => UserManager.handleTelegramAuth());
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => UserManager.handleLogout());
    
    // Order confirmation
    document.getElementById('confirm-order').addEventListener('click', () => OrderManager.confirmOrder());
    
    // Modal
    document.getElementById('close-modal').addEventListener('click', () => ModalManager.closeModal());
    
    // Search functionality
    document.getElementById('search-input').addEventListener('input', () => ProductManager.searchProducts());
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            ProductManager.filterProducts();
        });
    });
    
    // ZeSt Club subscription
    document.getElementById('subscribe-btn').addEventListener('click', () => ClubManager.handleSubscription());
    document.getElementById('manage-subscription').addEventListener('click', () => ClubManager.handleSubscription());
    
    // Close modal on backdrop click
    document.getElementById('product-modal').addEventListener('click', (e) => {
        if (e.target.id === 'product-modal') {
            ModalManager.closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            ModalManager.closeModal();
        }
    });

    // Prevent default behavior for all navigation buttons
    document.querySelectorAll('button[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
}

// Initialize the app
function initApp() {
    console.log('Initializing ZeSt app...');
    
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Set theme color
    tg.setHeaderColor('#FF5A1F');
    tg.setBackgroundColor('#FFFFFF');
    
    // Check if user is already authenticated
    Storage.loadUser();
    if (user) {
        UserManager.updateUserProfile();
    }
    
    // Check age verification
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified) {
        showMainApp();
    } else {
        showAgeVerification();
    }
    
    // Load products and services
    ProductManager.loadProducts();
    ServiceManager.loadServices();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize cart from localStorage
    Storage.loadCart();
    CartManager.updateUI();
    
    // Check subscription status
    ClubManager.checkSubscriptionStatus();
    
    console.log('ZeSt app initialized successfully');
}

function showAgeVerification() {
    document.getElementById('age-verification').classList.remove('hidden');
}

function showMainApp() {
    document.getElementById('age-verification').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
}

// Make functions available globally for onclick handlers
window.addToCart = (productId, quantity) => CartManager.addItem(productId, quantity);
window.updateCartItemQuantity = (productId, newQuantity) => CartManager.updateQuantity(productId, newQuantity);
window.removeFromCart = (productId) => CartManager.removeItem(productId);
window.openModal = (content) => ModalManager.openModal(content);
window.closeModal = () => ModalManager.closeModal();
window.switchPage = (pageName) => NavigationManager.switchPage(pageName);

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
