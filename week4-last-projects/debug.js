//Correction 1: stoktaki son urunu ekleyebilmek icin <= yerine < kullandim
//Correection 2: urunu sepete ekledigimizde stoktaki kod azalmiyor, onun azaltilmasini sagladik
//Correction 3: urun sepetten silindiginde stok miktarini arttirabilmek icin item.quantity kullandim
//Correction 4: toplam hesabi yapilirken urun fiyati ile urunun miktarinin carpimini ekledik
//Correction 5: indirim hesabi yapilirken %10 indirim icin 0.9 ile carpildi
//Correction 6: hata mesajlarini ust uste yazmamak icin = kullanildi
//Correction 7: urunu sildigimizde stok guncellenmesinin UI'a yansimasi icin stockUpdate ekledik
//Correction 8: ondalik format seklinde gozukmesi icin toFixed(2) ekledim
//Correction 9: undefined yazilmasi anlasilabilirlligi dusurdugu icin 1 yazdik ancak fonksiyonel olarak bir sey degismez cunku
//addItem(productId, quantity = 1) quantity burda zaten 1.

const products = [
  { id: 1, name: "Laptop", price: 15000, stock: 5 },
  { id: 2, name: "Telefon", price: 8000, stock: 10 },
  { id: 3, name: "Tablet", price: 5000, stock: 8 },
  { id: 4, name: "Kulaklık", price: 1000, stock: 15 },
  { id: 5, name: "Mouse", price: 500, stock: 20 },
];
class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.discountApplied = false;
  }
  addItem(productId, quantity = 1) {
    try {
      const product = products.find((p) => p.id === productId);
      if (!product) {
        throw new Error("Ürün bulunamadı!");
      }
      if (product.stock < quantity) {
        //Correction 1
        throw new Error("Yetersiz stok!");
      }
      const existingItem = this.items.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          productId,
          name: product.name,
          price: product.price,
          quantity,
        });
      }
      product.stock -= quantity; //Correction 2
      this.calculateTotal();
      this.updateUI();
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
      this.showError(error.message);
    }
  }
  removeItem(productId) {
    try {
      const itemIndex = this.items.findIndex(
        (item) => item.productId === productId
      );
      if (itemIndex === -1) {
        throw new Error("Ürün sepette bulunamadı!");
      }
      const item = this.items[itemIndex];
      const product = products.find((p) => p.id === productId);
      if (product) {
        product.stock += item.quantity; //Correction 3
      }
      this.items.splice(itemIndex, 1);
      this.calculateTotal();
      this.updateUI();
      //Correction 7
      document.dispatchEvent(new Event("stockUpdate"));
    } catch (error) {
      console.error("Ürün silme hatası:", error);
      this.showError(error.message);
    }
  }
  calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity; //Correction 4
    }, 0);
    if (this.discountApplied && this.total > 0) {
      this.total *= 0.9; //Correction 5
    }
  }
  applyDiscount(code) {
    if (code === "INDIRIM10" && !this.discountApplied) {
      this.discountApplied = true;
      this.calculateTotal();
      this.updateUI();
      this.showMessage("İndirim uygulandı!");
    } else {
      this.showError("Geçersiz indirim kodu!");
    }
  }
  updateUI() {
    const cartElement = document.getElementById("cart");
    const totalElement = document.getElementById("total");
    if (cartElement && totalElement) {
      cartElement.innerHTML = this.items
        .map(
          (item) => `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.quantity} adet</span>
                    <span>${item.price} TL</span>
                    <button onclick="cart.removeItem(${item.productId})">Sil</button>
                </div>
            `
        )
        .join("");

      totalElement.textContent = `Toplam: ${this.total.toFixed(2)} TL`; //Correction 8
    }
  }
  showError(message) {
    const errorElement = document.getElementById("error");
    if (errorElement) {
      errorElement.textContent = message; //Correction 6
      setTimeout(() => {
        errorElement.textContent = "";
      }, 3000);
    }
  }
  showMessage(message) {
    const messageElement = document.getElementById("message");
    if (messageElement) {
      messageElement.textContent = message;
      setTimeout(() => {
        messageElement.textContent = "";
      }, 3000);
    }
  }
}
class App {
  constructor() {
    window.cart = new ShoppingCart();
    this.initializeEventListeners();
  }
  initializeEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.renderProducts();
      this.setupEventHandlers();
    });
  }
  renderProducts() {
    const productsElement = document.getElementById("products");
    if (productsElement) {
      productsElement.innerHTML = products
        .map(
          (product) => `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>Fiyat: ${product.price}.00 TL</p>
                    <p>Stok: ${product.stock}</p>
                    <button onclick="app.addToCart(${product.id})"
                            ${product.stock === 0 ? "disabled" : ""}>
                        Sepete Ekle
                    </button>
                </div>
            `
        )
        .join("");
    }
  }
  setupEventHandlers() {
    const discountForm = document.getElementById("discount-form");
    if (discountForm) {
      discountForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const codeInput = document.getElementById("discount-code");
        if (codeInput) {
          window.cart.applyDiscount(codeInput.value);
        }
      });
    }
    document.addEventListener("stockUpdate", () => {
      this.renderProducts();
    });
  }
  addToCart(productId) {
    window.cart.addItem(productId, 1); //Correction 9
    document.dispatchEvent(new Event("stockUpdate"));
  }
}
const app = new App();
window.app = app;
