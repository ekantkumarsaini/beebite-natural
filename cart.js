let cart = [];

// 1. ADD ITEM TO CART
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCartUI();
    alert(`${name} has been added to your cart!`);
}

// 2. REMOVE ITEM FROM CART
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

// 3. UPDATE UI COUNTERS AND ITEMS LIST
function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.innerText = totalQuantity;
    
    let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalPriceElement.innerText = totalPrice;
    
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color:#777; text-align:center; padding:15px;">Your cart is empty.</p>';
        return;
    }
    
    cart.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';
        itemRow.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>₹${item.price} x ${item.quantity}</small>
            </div>
            <div class="cart-item-remove" onclick="removeFromCart('${item.name}')">
                <i class="fas fa-trash-alt"></i> Remove
            </div>
        `;
        cartItemsContainer.appendChild(itemRow);
    });
}

// 4. OPEN/CLOSE CART POPUP WINDOW
function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('show-modal');
}

// 5. SEND FINALIZED DATA VIA WHATSAPP API
function sendOrder(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out!");
        return;
    }
    
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    
    let orderDetails = `*NEW ORDER - BEEBITE NATURAL*%0A%0A`;
    orderDetails += `*Customer Name:* ${name}%0A`;
    orderDetails += `*Mobile:* ${phone}%0A`;
    orderDetails += `*Delivery Address:* ${address}%0A%0A`;
    orderDetails += `*--- ITEMS ORDERED ---*%0A`;
    
    cart.forEach((item, index) => {
        orderDetails += `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${item.price * item.quantity}%0A`;
    });
    
    let finalTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    orderDetails += `%0A*Grand Total:* ₹${finalTotal}%0A%0A`;
    orderDetails += `Kindly confirm availability and shipping timelines. Thank you!`;
    
    const whatsappURL = `https://wa.me/919027440549?text=${orderDetails}`;
    window.open(whatsappURL, '_blank');
}