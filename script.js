let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, sizeId) {
  const size = document.getElementById(sizeId).value;
  cart.push({ name, price, size });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}

function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  const whatsappLink = document.getElementById("whatsapp-order");
  if (!cartItems) { updateCartCount(); return; }

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} (размер: ${item.size}) - ${item.price} сом`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.className = "btn";
    delBtn.onclick = () => { cart.splice(index,1); localStorage.setItem("cart", JSON.stringify(cart)); loadCart(); };
    li.appendChild(delBtn);
    cartItems.appendChild(li);
  });

  totalPriceEl.textContent = `Итого: ${total} сом`;

  const message = encodeURIComponent(
    "Здравствуйте! Хочу заказать:\n" +
    cart.map(i => `${i.name} (размер: ${i.size}) - ${i.price} сом`).join("\n") +
    `\nИтого: ${total} сом`
  );

  whatsappLink.href = `https://wa.me/996507011527?text=${message}`;
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", loadCart);




