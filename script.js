// Global State Tracker for Cart Items
let cart = [];

// DOM Elements
const cartSidebar = document.getElementById('cart-sidebar');
const cartNavBtn = document.getElementById('cart-nav-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');

// Open and Close Cart Sidebar
cartNavBtn.addEventListener('click', (e) => {
    e.preventDefault(); // link behavior off karne ke liye
    cartSidebar.classList.add('open');
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Add Item Functional Logic
function addToCart(itemName, price) {
    // Array object structured build up
    cart.push({ name: itemName, price: price });
    
    // UI components updates run karenge
    updateCartUI();
}

// Function to refresh and redraw Sidebar state
function updateCartUI() {
    // Count tracking update
    cartCountElement.textContent = cart.length;
    
    // Container clean clear karna
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty!</p>';
        cartTotalElement.textContent = 'Rs. 0';
        return;
    }
    
    let total = 0;
    
    // Loop mapping to display current layout list
    cart.forEach((item, index) => {
        total += item.price;
        
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item-row';
        itemRow.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small style="color: #776255">Rs. ${item.price}</small>
            </div>
            <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">❌</button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });
    
    // Price sum updating render step
    cartTotalElement.textContent = `Rs. ${total}`;
}

// Remove item logic
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Smooth scrolling behavior updates for Navbar Links
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Checkout handler logic simulation
function checkout() {
    if (cart.length === 0) {
        alert('Oops! Your cart is completely empty.');
        return;
    }
    alert('Thank you for ordering your delicious treats! ❤️ Your order is simulated successfully!');
    cart = [];
    updateCartUI();
    cartSidebar.classList.remove('open');
}