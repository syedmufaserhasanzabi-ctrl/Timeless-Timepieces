// Hamburger menu functionality
const hamburger = document.getElementById("hamburger");
const navlinks = document.getElementById("navlinks");

hamburger.addEventListener("click", ()=>{
       navlinks.classList.toggle("navlinks-active")
});

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to add item to cart
function addToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }
    updateCartStorage();
    loadCartSection();
}

// Update cart storage
function updateCartStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load cart section
function loadCartSection() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
            <div class="cart-quantity">
                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = total;

    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const action = e.target.dataset.action;
            updateItemQuantity(id, action);
        });
    });
}

// Update item quantity
function updateItemQuantity(id, action) {
    const item = cartItems.find(item => item.id === id);
    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease') {
        item.quantity--;
        if (item.quantity <= 0) {
            cartItems = cartItems.filter(item => item.id !== id);
        }
    }
    updateCartStorage();
    loadCartSection();
}

// Add event listeners to "Add to Cart" and "Order Now" buttons
document.querySelectorAll('.secondary-btn, .section-two-btn').forEach(button => {
    if (button.textContent.trim() === 'Add to Cart' || button.textContent.trim() === 'Order Now') {
        button.addEventListener('click', () => {
            let item = {};
            const buttonId = button.dataset.id;

            if (buttonId === 'tissot-arrival') {
                item = { id: 'tissot-arrival', name: 'Tissot Watch', price: 999, image: 'img-3.png' };
            } else if (buttonId === 'klassc-arrival') {
                item = { id: 'klassc-arrival', name: 'Klassc Watch', price: 999, image: 'img-4.png' };
            } else if (buttonId === 'citizen-arrival') {
                item = { id: 'citizen-arrival', name: 'Citizen Watch', price: 999, image: 'img-5.png' };
            } else if (button.textContent.trim() === 'Add to Cart') {
                item = { id: 'blue-omega', name: 'Blue Omega TT', price: 1000, image: 'img-1.png' };
            } else if (button.textContent.trim() === 'Order Now') {
                item = { id: 'quartz-casio', name: 'Quartz Casio', price: 1000, image: 'img-2.png' };
            }
            addToCart(item);
            alert('Item added to cart!');
        });
    }
});

// Add event listeners to collection "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        let item = {};
        switch (id) {
            case 'rado':
                item = { id: 'rado', name: 'Rado Collection', price: 1500, image: 'img-7.jpg' };
                break;
            case 'geneve':
                item = { id: 'geneve', name: 'Geneve Collection', price: 1200, image: 'img-8.jpg' };
                break;
            case 'tissot':
                item = { id: 'tissot', name: 'Tissot Collection', price: 1100, image: 'img-9.jpg' };
                break;
            case 'cartier':
                item = { id: 'cartier', name: 'Cartier Collection', price: 2000, image: 'img-10.jpg' };
                break;
            case 'omega':
                item = { id: 'omega', name: 'Omega Collection', price: 1800, image: 'img-11.jpg' };
                break;
            case 'fitron':
                item = { id: 'fitron', name: 'Fitron Collection', price: 900, image: 'img-12.jpg' };
                break;
        }
        addToCart(item);

        // Show the product name box
        const card = button.parentElement;
        const nameBox = card.querySelector('h3');
        nameBox.style.opacity = '1';

        // Hide after 2 seconds
        setTimeout(() => {
            nameBox.style.opacity = '0';
        }, 2000);

        alert('Item added to cart!');
    });
});

// Load cart section on page load
document.addEventListener('DOMContentLoaded', loadCartSection);



