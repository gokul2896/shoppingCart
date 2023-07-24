const btnCart = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

btnCart.addEventListener('click', () => {
    cart.classList.add("cart-active");
})

btnClose.addEventListener('click', () => {
    cart.classList.remove("cart-active");
})

document.addEventListener("DOMContentLoaded",loadFood);

function loadFood() {
    loadContent();
}

function loadContent() {
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    let qntyElements = document.querySelectorAll('.cart-quantity');
    qntyElements.forEach((input) =>{
        input.addEventListener('change',changeQty);
    })

    let cartBtn = document.querySelectorAll('.add-cart');
    cartBtn.forEach((btn) =>{
        btn.addEventListener('click',addCart);
    });
    updateTotal();
}

function removeItem() {
    if(confirm("Are You Sure to Remove")){
    let title = this.parentElement.querySelector(".cart-food-title").innerHTML;
    itemList = itemList.filter(el=> el.foodTitle!=title);
    this.parentElement.remove();
    loadContent();
    }
}

function changeQty() {
    if(isNaN(this.value) || this.value<1) {
        this.value=1;
    }
    loadContent();
}
let itemList = [];

function addCart() {
    let food = this.parentElement;
    let foodTitle = food.querySelector(".food-title").innerHTML;
    let foodPrice = food.querySelector(".food-price").innerHTML;
    let foodImage = food.querySelector(".food-img").src;
    
    let newProduct = {foodTitle,foodPrice,foodImage};
    if (itemList.find((el) => el.foodTitle == newProduct.foodTitle)) {
        alert("Product Already added in Cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductEl = createCartProduct(foodTitle, foodPrice, foodImage);
    let element = document.createElement("div");
    element.innerHTML = newProductEl;
    let cartBasket = document.querySelector(".cart-content");
    cartBasket.append(element);
    loadContent();
}

function createCartProduct(foodTitle, foodPrice, foodImage) {
    return `
        <div class="cart-box">
            <img src="${foodImage}" class="cart-image">
            <div class="detail-box">
                <div class="cart-food-title">${foodTitle}</div>
                    <div class="price-box">
                    <div class="cart-price">${foodPrice}</div>
                    <div class="cart-amount">${foodPrice}</div>
                </div>
                <input type="number" value="1" class="cart-quantity">
            </div>
                <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
        </div>
        `;
}

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;
    cartItems.forEach(product => {
        let cartPrice = product.querySelector('.cart-price');
        let price = parseFloat(cartPrice.innerHTML.replace("Rs.",""));
        let qty = product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amount').innerText = "Rs."+(price*qty);
    });
    totalValue.innerHTML = 'Rs.' + total;

    const cartCount = document.querySelector(".cart-count");
    let count = itemList.length;
    cartCount.innerHTML = count;

    if(count==0) {
        cartCount.style.display = "none";
    } else {
        cartCount.style.display = "block";
    }
}