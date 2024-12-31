// Initialize cart variables
let cart = [];
let cartTotal = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const cartIcon = document.getElementById('cartIcon');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const totalAmount = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const buyButtons = document.querySelectorAll('.buy-btn');

    // Toggle cart dropdown
    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.classList.toggle('show');
        console.log('Cart clicked'); // Debug line
    });

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
            cartDropdown.classList.remove('show');
        }
    });

    // Add to cart functionality
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = button.closest('.phone-card') || button.closest('.product-info');
            const name = card.querySelector('h3, h2').textContent;
            const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
            
            // Add item to cart
            cart.push({ name, price });
            cartTotal += price;
            
            // Update UI
            updateCartUI();
            
            // Show notification
            showNotification(`Added to cart: ${name}`);
        });
    });

    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert(`Total amount: $${cartTotal.toFixed(2)}\nThank you for your purchase!`);
            cart = [];
            cartTotal = 0;
            updateCartUI();
            cartDropdown.classList.remove('show');
        } else {
            alert('Your cart is empty!');
        }
    });

    // Function to update cart UI
    function updateCartUI() {
        // Update cart count
        cartCount.textContent = cart.length;
        
        // Update cart items
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})" class="remove-item">×</button>
            </div>
        `).join('');
        
        // Update total
        totalAmount.textContent = cartTotal.toFixed(2);
    }

    // Make removeFromCart function global
    window.removeFromCart = function(index) {
        cartTotal -= cart[index].price;
        cart.splice(index, 1);
        updateCartUI();
    };

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
