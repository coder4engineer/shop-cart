//---------------slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlides(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length}
    for (i = 0; i < slides.length; i++){ 
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(' active', " ")
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

//autoslide

//var slideIndex = 0;
//showSlides();

//function showSlides () {
   // var i;
    //var slides = document.getElementsByClassName("slide");
    //for (i = 0; i < slides.length; i++){
     //   slides[i].style.display = "none";
    //}
    //slideIndex++;
    //if (slideIndex > slides.lenght) {
      //  slidenIndex = 1
    //}

    //slides[slideIndex - 1].style.display = "block";
    //setTimeout(showSlides, 2000);
    //change image every 2s
//}
let carts = document.querySelectorAll('.add-cart');
//product JSON files
let product = [
    {
        name: 'Suzuki Skydrive Crossover',
        tag: '1s',
        price: 69900,
        inCart: 0
    },
    {
        name: 'Yamaha R15 v3',
        tag: '2s',
        price: 164000,
        inCart: 0
    },
    {
        name: 'Yamaha Mio Soul i125',
        tag: '3s',
        price: 83900,
        inCart: 0
    },
    {
        name: 'Yamaha Mio i125',
        tag: '4s',
        price: 72400,
        inCart: 0
    },
    {
        name: 'Yamaha Mio Sporty',
        tag: '5s',
        price: 66900,
        inCart: 0
    },
    {
        name: 'Honda Click 125i',
        tag: '6s',
        price: 77400,
        inCart: 0
    },
    {
        name: 'Honda Beat 2021',
        tag: '7s',
        price: 70400,
        inCart: 0
    },
    {
        name: 'Suzuki Burgman Street',
        tag: '8s',
        price: 76000,
        inCart: 0
    }
];
//using on click event listener to know that the item is being clicked
for (let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click',() => {
        cartNumbers(product[i]);
        totalCost(product[i])
    })
}
//loads the stored data on how many are there in the cart when loading the page using the local storage
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
//sets the number in the cart
function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
   if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span') .textContent =productNumbers + 1;
   } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span ') .textContent = 1 ;
   }
    setItems(product);
}
//set the number of items that is clicked in the cart
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    //checked if the cartItems is null
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1; 
    } else {
     product.inCart = 1;
         cartItems = {
            [product.tag]: product
         }
    }   
    product.inCart = 1;

    //json stringify turns object into subjects that can stored on the browser local storage
    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

//computes the total cost in the cart
function totalCost(product ){
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}
//function that displaying the cartItems in the local storage that can put in the modal
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".product");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if( cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += ` 
            <div class = "product">
                <ion-icon name="close-circle"></ion-icon>
                <span>${item.name}M</span>
            </div>
            <div class="price">P${item.price}.00</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                P${item.inCart * item.price}.00
            </div>    
            `;
        });

        productContainer.innerHTML += ` 
            <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                P${cartCost}.00
            </h4>
            `;
    }
}
// items stay on the page whenever the user reload the page
onLoadCartNumbers();
displayCart();

//modal
// call the funtion of the carticon/button when clicked then reload the modal
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
    displayCart();
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target ==modal){
        modal.style.display = "none";
    }
}