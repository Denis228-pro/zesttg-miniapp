// ZeSt Energy Drinks Telegram Mini App
// Fully compliant with Telegram Mini App requirements

class ZeStApp {
  constructor() {
    this.tg = window.Telegram.WebApp;
    this.products = [
      {
        product_id: "1",
        name: { ru: "Red Bull", en: "Red Bull" },
        description: { ru: "Энергетический напиток Red Bull 250 мл", en: "Red Bull Energy Drink 250 ml" },
        volume: "250 мл",
        brand: "Red Bull",
        retail_price: 120,
        club_price: 100,
        image_url: "https://images.unsplash.com/photo-1625368505547-954e0f0d5eb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "energy",
        discount: 15
      },
      {
        product_id: "2",
        name: { ru: "Burn", en: "Burn" },
        description: { ru: "Энергетический напиток Burn 500 мл", en: "Burn Energy Drink 500 ml" },
        volume: "500 мл",
        brand: "Burn",
        retail_price: 90,
        club_price: 75,
        image_url: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "energy",
        discount: 10
      },
      {
        product_id: "3",
        name: { ru: "Adrenaline", en: "Adrenaline" },
        description: { ru: "Энергетический напиток Adrenaline 400 мл", en: "Adrenaline Energy Drink 400 ml" },
        volume: "400 мл",
        brand: "Adrenaline",
        retail_price: 80,
        club_price: 65,
        image_url: "https://images.unsplash.com/photo-1624066295805-7c0b31b89c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "energy",
        discount: 5
      },
      {
        product_id: "4",
        name: { ru: "Monster", en: "Monster" },
        description: { ru: "Энергетический напиток Monster 500 мл", en: "Monster Energy Drink 500 ml" },
        volume: "500 мл",
        brand: "Monster",
        retail_price: 130,
        club_price: 110,
        image_url: "https://images.unsplash.com/photo-1619619030329-931a379c7c9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "energy",
        discount: 20
      },
      {
        product_id: "5",
        name: { ru: "Gorilla", en: "Gorilla" },
        description: { ru: "Энергетический напиток Gorilla 500 мл", en: "Gorilla Energy Drink 500 ml" },
        volume: "500 мл",
        brand: "Gorilla",
        retail_price: 150,
        club_price: 125,
        image_url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "energy",
        discount: 12
      },
      {
        product_id: "6",
        name: { ru: "Coca-Cola", en: "Coca-Cola" },
        description: { ru: "Классическая Coca-Cola 330 мл", en: "Classic Coca-Cola 330 ml" },
        volume: "330 мл",
        brand: "Coca-Cola",
        retail_price: 60,
        club_price: 50,
        image_url: "https://images.unsplash.com/photo-1578601474434-184058b352df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "soft",
        discount: 0
      },
      {
        product_id: "7",
        name: { ru: "Fanta", en: "Fanta" },
        description: { ru: "Fanta апельсин 330 мл", en: "Fanta Orange 330 ml" },
        volume: "330 мл",
        brand: "Fanta",
        retail_price: 60,
        club_price: 50,
        image_url: "https://images.unsplash.com/photo-1578601474434-184058b352df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "soft",
        discount: 0
      },
      {
        product_id: "8",
        name: { ru: "Святой источник", en: "Holy Spring" },
        description: { ru: "Питьевая вода Святой источник 1.5 л", en: "Holy Spring Drinking Water 1.5 L" },
        volume: "1.5 л",
        brand: "Святой источник",
        retail_price: 45,
        club_price: 38,
        image_url: "https://images.unsplash.com/photo-1542712725-66d583f6c312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "water",
        discount: 5
      },
      {
        product_id: "9",
        name: { ru: "Lays", en: "Lays" },
        description: { ru: "Чипсы Lays классические 150 г", en: "Lays Classic Chips 150 g" },
        volume: "150 г",
        brand: "Lays",
        retail_price: 85,
        club_price: 70,
        image_url: "https://images.unsplash.com/photo-1628384540883-6c7b74c9f0d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "snacks",
        discount: 10
      },
      {
        product_id: "10",
        name: { ru: "Doritos", en: "Doritos" },
        description: { ru: "Чипсы Doritos острые 120 г", en: "Doritos Hot Chips 120 g" },
        volume: "120 г",
        brand: "Doritos",
        retail_price: 95,
        club_price: 80,
        image_url: "https://images.unsplash.com/photo-1628384540883-6c7b74c9f0d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "snacks",
        discount: 8
      }
    ];
    
    this.services = [
      {
        id: "delivery-naryan-mar",
        name: "Доставка в Нарьян-Мар",
        description: "Быстрая и надежная доставка по городу Нарьян-Мар",
        price: 50
      },
      {
        id: "delivery-iskateli",
        name: "Доставка в рп. Искатели",
        description: "Доставка в поселок Искатели",
        price: 15
      },
      {
        id: "exact-time",
        name: "Точное время доставки",
        description: "Укажите удобное время доставки",
        price: 10
      },
      {
        id: "bag",
        name: "Пакет",
        description: "Экологичный пакет для переноски покупок",
        price: 8
      },
      {
        id: "gift-wrap",
        name: "Подарочная упаковка",
        description: "Красивая упаковка для подарка",
        price: 35
      },
      {
        id: "postcard",
        name: "Открытка",
        description: "Персонализированная открытка с вашим сообщением",
        price: 50
      }
    ];
    
    this.state = {
      currentPage: 'catalog',
      cart: [],
      servicesCart: [],
      isAgeConfirmed: false,
      user: {
        isClubMember: false,
        theme: 'light',
        notifications: true
      },
      orders: [],
      currentCategory: 'all',
      searchTerm: ''
    };
    
    this.init();
  }
  
  init() {
    // Initialize Telegram WebApp
    this.tg.ready();
    this.tg.expand();
    
    // Set main button
    this.tg.MainButton.setText('Открыть корзину');
    this.tg.MainButton.show();
    this.tg.MainButton.onClick(() => {
      this.navigateTo('cart');
      this.updateActiveNavButton('cart');
    });
    
    // Handle back button
    this.tg.BackButton.onClick(() => {
      if (this.state.currentPage !== 'catalog') {
        this.navigateTo('catalog');
        this.updateActiveNavButton('catalog');
      } else {
        this.tg.showConfirm('Вы уверены, что хотите закрыть приложение?', (confirmed) => {
          if (confirmed) {
            this.tg.close();
          }
        });
      }
    });
    
    // Load user data
    this.loadUserData();
    
    // Set up event listeners after DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
    } else {
      this.setupEventListeners();
    }
    
    // Render initial products
    if (document.readyState !== 'loading') {
      this.renderProducts(this.filterProducts());
      this.updateCartCount();
    }
  }
  
  setupEventListeners() {
    // Age gate
    document.getElementById('age-gate-confirm').addEventListener('click', () => this.confirmAge());
    document.getElementById('age-gate-deny').addEventListener('click', () => this.denyAge());
    
    // Navigation
    document.querySelectorAll('.nav-button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const page = button.getAttribute('data-page');
        this.navigateTo(page);
        this.updateActiveNavButton(page);
      });
    });
    
    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
      this.state.searchTerm = e.target.value.toLowerCase();
      this.renderProducts(this.filterProducts());
    });
    
    // Categories
    document.querySelectorAll('.category').forEach(category => {
      category.addEventListener('click', () => {
        document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));
        category.classList.add('active');
        this.state.currentCategory = category.getAttribute('data-category');
        this.renderProducts(this.filterProducts());
      });
    });
    
    // Cart button in header
    document.getElementById('header-cart-btn').addEventListener('click', () => {
      this.navigateTo('cart');
      this.updateActiveNavButton('cart');
    });
    
    // Cart actions
    document.getElementById('checkout-button').addEventListener('click', () => this.initiateCheckout());
    
    // Profile settings
    document.getElementById('theme-selector').addEventListener('change', (e) => {
      this.state.user.theme = e.target.value;
      this.saveUserData();
      this.applyTheme(e.target.value);
    });
    
    document.getElementById('notifications-toggle').addEventListener('change', (e) => {
      this.state.user.notifications = e.target.checked;
      this.saveUserData();
    });
    
    document.getElementById('toggle-subscription').addEventListener('click', () => this.toggleSubscription());
    document.getElementById('clear-data-button').addEventListener('click', () => this.clearUserData());
    document.getElementById('refresh-orders').addEventListener('click', () => this.loadOrders());
    document.getElementById('subscribe-button').addEventListener('click', () => this.subscribeToClub());
    
    // Service add buttons
    document.querySelectorAll('.service-add-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const serviceId = e.target.getAttribute('data-service');
        this.addServiceToCart(serviceId);
      });
    });
  }
  
  filterProducts() {
    return this.products.filter(product => {
      const categoryMatch = this.state.currentCategory === 'all' || product.category === this.state.currentCategory;
      const searchMatch = this.state.searchTerm === '' || 
        product.name.ru.toLowerCase().includes(this.state.searchTerm) || 
        product.description.ru.toLowerCase().includes(this.state.searchTerm) ||
        product.brand.toLowerCase().includes(this.state.searchTerm);
      return categoryMatch && searchMatch;
    });
  }
  
  confirmAge() {
    this.state.isAgeConfirmed = true;
    localStorage.setItem('ageConfirmed', 'true');
    this.showMainApp();
  }
  
  denyAge() {
    this.tg.showAlert('Вы должны быть старше 18 лет для использования этого приложения', () => {
      this.tg.close();
    });
  }
  
  showMainApp() {
    document.getElementById('age-gate').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
  }
  
  showAgeGate() {
    document.getElementById('age-gate').style.display = 'flex';
    document.getElementById('app').classList.add('hidden');
  }
  
  navigateTo(page) {
    this.state.currentPage = page;
    
    // Hide all pages
    document.querySelectorAll('[id$="-page"]').forEach(pageEl => {
      pageEl.classList.add('hidden');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
      targetPage.classList.remove('hidden');
    }
    
    // Update main button text based on page
    if (page === 'cart') {
      this.tg.MainButton.hide();
    } else {
      this.tg.MainButton.setText('Открыть корзину');
      this.tg.MainButton.show();
    }
    
    // Handle back button visibility
    if (page !== 'catalog') {
      this.tg.BackButton.show();
    } else {
      this.tg.BackButton.hide();
    }
    
    // Load page content
    this.loadPageContent(page);
  }
  
  loadPageContent(page) {
    switch(page) {
      case 'catalog':
        this.renderProducts(this.filterProducts());
        break;
      case 'cart':
        this.renderCart();
        break;
      case 'profile':
        this.updateMembershipStatus();
        this.loadOrders();
        break;
    }
  }
  
  updateActiveNavButton(page) {
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`.nav-button[data-page="${page}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
  
  renderProducts(productsList) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    if (productsList.length === 0) {
      container.innerHTML = '<p class="no-results">Товары не найдены</p>';
      return;
    }
    
    productsList.forEach(product => {
      const price = this.state.user.isClubMember ? product.club_price : product.retail_price;
      const hasDiscount = this.state.user.isClubMember && product.club_price < product.retail_price;
      
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image_url}" alt="${product.name.en}" class="product-image">
          ${product.discount > 0 ? `<div class="product-badge">-${product.discount}%</div>` : ''}
        </div>
        <div class="product-info">
          <h3>${product.name.ru}</h3>
          <p class="product-description">${product.description.ru}</p>
          <div class="product-meta">
            <span class="product-volume">${product.volume}</span>
            <span class="product-brand">${product.brand}</span>
          </div>
          <div class="product-prices">
            <div class="product-price">₽${price}</div>
            ${hasDiscount ? `<div class="product-old-price">₽${product.retail_price}</div>` : ''}
          </div>
          <div class="product-actions">
            <button class="add-to-cart btn" data-id="${product.product_id}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 5px;">
                <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/>
              </svg>
              В корзину
            </button>
          </div>
        </div>
      `;
      container.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = button.getAttribute('data-id');
        this.addToCart(productId);
        this.tg.HapticFeedback.impactOccurred('medium');
      });
    });
  }
  
  addToCart(productId) {
    const product = this.products.find(p => p.product_id === productId);
    if (!product) return;
    
    const existingItem = this.state.cart.find(item => item.product_id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.state.cart.push({
        product_id: product.product_id,
        name: product.name.ru,
        price: this.state.user.isClubMember ? product.club_price : product.retail_price,
        quantity: 1,
        image_url: product.image_url
      });
    }
    
    this.saveCart();
    this.updateCartCount();
    this.tg.showAlert(`Добавлено в корзину: ${product.name.ru}`);
    
    if (this.state.currentPage === 'cart') {
      this.renderCart();
    }
  }
  
  addServiceToCart(serviceId) {
    const service = this.services.find(s => s.id === serviceId);
    if (!service) return;
    
    const existingItem = this.state.servicesCart.find(item => item.id === serviceId);
    
    if (existingItem) {
      this.tg.showAlert('Услуга уже добавлена в корзину');
    } else {
      this.state.servicesCart.push({
        id: service.id,
        name: service.name,
        price: service.price
      });
      
      this.tg.showAlert(`Услуга добавлена в корзину: ${service.name}`);
    }
    
    this.updateCartCount();
  }
  
  updateCartCount() {
    const totalItems = this.state.cart.reduce((total, item) => total + item.quantity, 0) + 
                      this.state.servicesCart.length;
    const headerCartCount = document.getElementById('header-cart-count');
    const bottomNavCartCount = document.getElementById('bottom-nav-cart-count');
    
    headerCartCount.textContent = totalItems;
    bottomNavCartCount.textContent = totalItems;
    
    if (totalItems === 0) {
      headerCartCount.style.display = 'none';
      bottomNavCartCount.style.display = 'none';
    } else {
      headerCartCount.style.display = 'flex';
      bottomNavCartCount.style.display = 'flex';
    }
  }
  
  renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    
    if (this.state.cart.length === 0 && this.state.servicesCart.length === 0) {
      container.innerHTML = '<p class="empty-cart-message">Ваша корзина пуста</p>';
      document.getElementById('cart-total').textContent = '0 руб';
      return;
    }
    
    let total = 0;
    
    // Render product items
    this.state.cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <div class="cart-item-price">₽${item.price} за шт.</div>
          <div class="cart-item-controls">
            <div class="quantity-control">
              <button class="decrease-qty btn btn-sm" data-id="${item.product_id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13H5v-2h14v2z"/>
                </svg>
              </button>
              <span>${item.quantity}</span>
              <button class="increase-qty btn btn-sm" data-id="${item.product_id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
            </div>
            <div class="cart-item-total">₽${itemTotal}</div>
          </div>
        </div>
      `;
      container.appendChild(cartItem);
    });
    
    // Render service items
    this.state.servicesCart.forEach(item => {
      total += item.price;
      
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="cart-item-image" style="background-color: var(--services-color); display: flex; align-items: center; justify-content: center; color: white;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
          </svg>
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <div class="cart-item-price">₽${item.price} за услугу</div>
          <div class="cart-item-controls">
            <button class="remove-service btn btn-sm btn-outline" data-id="${item.id}">Удалить</button>
            <div class="cart-item-total">₽${item.price}</div>
          </div>
        </div>
      `;
      container.appendChild(cartItem);
    });
    
    document.getElementById('cart-total').textContent = `${total} руб`;
    
    // Add event listeners for quantity controls
    document.querySelectorAll('.decrease-qty').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        this.updateCartQuantity(productId, -1);
        this.tg.HapticFeedback.impactOccurred('light');
      });
    });
    
    document.querySelectorAll('.increase-qty').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        this.updateCartQuantity(productId, 1);
        this.tg.HapticFeedback.impactOccurred('light');
      });
    });
    
    // Add event listeners for service removal
    document.querySelectorAll('.remove-service').forEach(button => {
      button.addEventListener('click', () => {
        const serviceId = button.getAttribute('data-id');
        this.removeServiceFromCart(serviceId);
        this.tg.HapticFeedback.impactOccurred('light');
      });
    });
  }
  
  updateCartQuantity(productId, change) {
    const item = this.state.cart.find(item => item.product_id === productId);
    
    if (item) {
      item.quantity += change;
      
      if (item.quantity <= 0) {
        this.state.cart = this.state.cart.filter(item => item.product_id !== productId);
      }
      
      this.saveCart();
      this.updateCartCount();
      this.renderCart();
    }
  }
  
  removeServiceFromCart(serviceId) {
    this.state.servicesCart = this.state.servicesCart.filter(item => item.id !== serviceId);
    this.updateCartCount();
    this.renderCart();
  }
  
  initiateCheckout() {
    if (this.state.cart.length === 0 && this.state.servicesCart.length === 0) {
      this.tg.showAlert('Ваша корзина пуста');
      return;
    }
    
    const productTotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceTotal = this.state.servicesCart.reduce((sum, item) => sum + item.price, 0);
    const total = productTotal + serviceTotal;
    
    // Create order
    const order = {
      orderId: 'ORD-' + Date.now(),
      items: [...this.state.cart],
      services: [...this.state.servicesCart],
      total: total,
      timestamp: Date.now(),
      status: 'completed'
    };
    
    this.state.orders.unshift(order);
    this.saveOrders();
    
    // Clear cart
    this.state.cart = [];
    this.state.servicesCart = [];
    this.saveCart();
    this.updateCartCount();
    
    this.tg.showAlert('Заказ успешно оформлен!', () => {
      this.navigateTo('catalog');
      this.updateActiveNavButton('catalog');
    });
    
    // Send data to bot
    this.tg.sendData(JSON.stringify({
      type: 'order_completed',
      order: order
    }));
  }
  
  saveCart() {
    localStorage.setItem('zestCart', JSON.stringify(this.state.cart));
    localStorage.setItem('zestServicesCart', JSON.stringify(this.state.servicesCart));
  }
  
  saveUserData() {
    localStorage.setItem('zestUser', JSON.stringify(this.state.user));
  }
  
  saveOrders() {
    localStorage.setItem('zestOrders', JSON.stringify(this.state.orders));
  }
  
  loadUserData() {
    const savedCart = localStorage.getItem('zestCart');
    const savedServicesCart = localStorage.getItem('zestServicesCart');
    const savedUser = localStorage.getItem('zestUser');
    const savedClubMember = localStorage.getItem('zestClubMember');
    const savedAgeConfirmed = localStorage.getItem('ageConfirmed');
    
    if (savedCart) {
      this.state.cart = JSON.parse(savedCart);
    }
    
    if (savedServicesCart) {
      this.state.servicesCart = JSON.parse(savedServicesCart);
    }
    
    if (savedUser) {
      this.state.user = {...this.state.user, ...JSON.parse(savedUser)};
    }
    
    if (savedClubMember) {
      const memberData = JSON.parse(savedClubMember);
      const expiry = new Date(memberData.expiry);
      const now = new Date();
      
      if (now < expiry) {
        this.state.user.isClubMember = true;
      } else {
        localStorage.removeItem('zestClubMember');
      }
    }
    
    if (savedAgeConfirmed) {
      this.state.isAgeConfirmed = savedAgeConfirmed === 'true';
      if (this.state.isAgeConfirmed) {
        this.showMainApp();
      }
    }
    
    // Apply theme
    this.applyTheme(this.state.user.theme);
    
    // Set form controls
    document.getElementById('theme-selector').value = this.state.user.theme;
    document.getElementById('notifications-toggle').checked = this.state.user.notifications;
  }
  
  loadOrders() {
    const savedOrders = localStorage.getItem('zestOrders');
    if (savedOrders) {
      this.state.orders = JSON.parse(savedOrders);
    }
    
    this.renderOrders();
  }
  
  renderOrders() {
    const container = document.getElementById('orders-container');
    const noOrdersMessage = document.getElementById('no-orders-message');
    
    container.innerHTML = '';
    
    if (this.state.orders.length === 0) {
      noOrdersMessage.style.display = 'block';
      return;
    }
    
    noOrdersMessage.style.display = 'none';
    
    this.state.orders.forEach(order => {
      const orderElement = document.createElement('div');
      orderElement.className = 'order-item';
      
      const orderDate = new Date(order.timestamp).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      orderElement.innerHTML = `
        <div class="order-header">
          <span class="order-id">#${order.orderId}</span>
          <span class="order-date">${orderDate}</span>
        </div>
        <div class="order-details">
          <span class="order-total">${order.total} ₽</span>
          <span class="order-status completed">Завершен</span>
        </div>
      `;
      
      container.appendChild(orderElement);
    });
  }
  
  applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Apply Telegram theme colors
    document.documentElement.style.setProperty('--primary-color', this.tg.themeParams.button_color || '#e33a1b');
    document.documentElement.style.setProperty('--text-color', this.tg.themeParams.text_color || '#333333');
    document.documentElement.style.setProperty('--background-color', this.tg.themeParams.bg_color || '#f8f8f8');
  }
  
  updateMembershipStatus() {
    const statusText = document.getElementById('subscription-status-text');
    statusText.textContent = this.state.user.isClubMember ? 'Активна' : 'Не активна';
  }
  
  toggleSubscription() {
    this.state.user.isClubMember = !this.state.user.isClubMember;
    this.saveUserData();
    this.updateMembershipStatus();
    
    if (this.state.user.isClubMember) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      
      localStorage.setItem('zestClubMember', JSON.stringify({
        isMember: true,
        expiry: expiry.toISOString()
      }));
      
      this.tg.showAlert("Подписка на ZeSt Club оформлена!");
    } else {
      localStorage.removeItem('zestClubMember');
      this.tg.showAlert("Подписка отменена");
    }
    
    this.renderProducts(this.filterProducts());
  }
  
  subscribeToClub() {
    if (this.tg.isBiometricAvailable) {
      this.tg.requestBiometricAuthentication(
        'Подписка на ZeSt Club',
        (isAuthenticated) => {
          if (isAuthenticated) {
            this.state.user.isClubMember = true;
            this.saveUserData();
            this.updateMembershipStatus();
            
            const expiry = new Date();
            expiry.setDate(expiry.getDate() + 30);
            
            localStorage.setItem('zestClubMember', JSON.stringify({
              isMember: true,
              expiry: expiry.toISOString()
            }));
            
            this.tg.showAlert("Подписка на ZeSt Club оформлена!");
            this.renderProducts(this.filterProducts());
          } else {
            this.tg.showAlert("Подписка отменена");
          }
        }
      );
    } else {
      this.state.user.isClubMember = true;
      this.saveUserData();
      this.updateMembershipStatus();
      
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
      
      localStorage.setItem('zestClubMember', JSON.stringify({
        isMember: true,
        expiry: expiry.toISOString()
      }));
      
      this.tg.showAlert("Подписка на ZeSt Club оформлена!");
      this.renderProducts(this.filterProducts());
    }
  }
  
  clearUserData() {
    this.tg.showConfirm('Вы уверены, что хотите очистить все данные?', (confirmed) => {
      if (confirmed) {
        localStorage.removeItem('zestCart');
        localStorage.removeItem('zestServicesCart');
        localStorage.removeItem('zestUser');
        localStorage.removeItem('zestOrders');
        localStorage.removeItem('zestClubMember');
        localStorage.removeItem('ageConfirmed');
        
        this.state.cart = [];
        this.state.servicesCart = [];
        this.state.user = {
          isClubMember: false,
          theme: 'light',
          notifications: true
        };
        this.state.orders = [];
        this.state.isAgeConfirmed = false;
        
        document.getElementById('theme-selector').value = 'light';
        document.getElementById('notifications-toggle').checked = true;
        
        this.applyTheme('light');
        this.updateMembershipStatus();
        this.renderOrders();
        this.updateCartCount();
        
        if (this.state.currentPage === 'cart') {
          this.renderCart();
        }
        
        this.showAgeGate();
        this.tg.showAlert('Все данные успешно очищены');
      }
    });
  }
}

// Initialize the app when the page loads
window.addEventListener('load', () => {
  window.zestApp = new ZeStApp();
});