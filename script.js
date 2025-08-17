let cart = [];

function addToCart(name, price, size) {
    cart.push({name, price, size});
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cart-list");
    const total = document.getElementById("total");
    list.innerHTML = "";
    let sum = 0;
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item.name + " (" + item.size + ") - " + item.price + " сом";
        list.appendChild(li);
        sum += item.price;
    });
    total.textContent = sum;
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }
    
    let orderText = 'Новый заказ:\n';
    cart.forEach(item => {
        orderText += '- ' + item.name + " (" + item.size + ") - " + item.price + " сом\n";
    });
    
    orderText += "\nИтого: " + document.getElementById("total").textContent + " сом";
    
    let whatsappNumber = "996507011527";
    
    let url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(orderText);
    window.open(url, "_blank");
    
    this.reset();
    cart = [];
    updateCart();
});