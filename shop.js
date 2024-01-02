document.addEventListener("DOMContentLoaded", function () {
    const products = [
        {
            "id": 1,
            "image": "./public/handbag.svg",
            "category": "Bag",
            "name": "Hand Bag",
            "priceOriginal": 60.00,
            "priceDiscount": 50.00,
            "discount": true,
            "discountPercentage": 10,
            "rating": 4
        },
        {
            "id": 2,
            "image": "./public/butterfly.svg",
            "category": "Bracelet",
            "name": "Butterfly Bracelet",
            "priceOriginal": 200.00,
            "priceDiscount": 170.00,
            "discount": true,
            "discountPercentage": 30,
            "rating": 5
        },
        {
            "id": 3,
            "image": "./public/shoes.svg",
            "category": "Shoes",
            "name": "Flat Shoes",
            "priceOriginal": 100.00,
            "priceDiscount": 95.00,
            "discount": true,
            "discountPercentage": 5,
            "rating": 5
        },
        {
            "id": 4,
            "image": "./public/organza.svg",
            "category": "Dress",
            "name": "Organza",
            "priceOriginal": 85.00,
            "priceDiscount": 70.00,
            "discount": true,
            "discountPercentage": 15,
            "rating": 4
        }
    ];
    // Create product cards efficiently
    const productList = document.getElementById("several-product");
    products.forEach((product) => {
        const productDiv = createProductCard(product);
        productList.appendChild(productDiv);
    });
});

function createProductCard(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("sproduct");

    var cardTop = document.createElement("div");
    cardTop.classList.add("product-top");


    if (product.discount) {
        var discount = document.createElement("p");
        discount.classList.add("product-dis");
        discount.textContent = "-" + parseFloat(product.discountPercentage).toFixed(2) + "%";
        cardTop.appendChild(discount);
    }


    // Create individual elements using createElement and set content

    const imgname = document.createElement("div");
    imgname.classList.add("img-name");
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.classList.add("product-image");
    imgname.appendChild(img);
    var name = document.createElement("p");
    name.classList.add("product-name");
    name.textContent = product.name;
    imgname.appendChild(name);
    cardTop.appendChild(imgname)

    var likeImage = document.createElement('button')
    likeImage.classList.add("like-image");
    likeImage.innerHTML = `<svg width="23" height="32" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.7609 9.74613C21.7609 5.31958 19.3767 1.7312 16.4356 1.7312C14.4106 1.7312 12.6499 3.43267 11.7493 5.93731C10.8488 3.43267 9.08809 1.7312 7.06308 1.7312C4.12199 1.7312 1.73779 5.31958 1.73779 9.74613C1.73779 11.6504 2.18098 13.3972 2.918 14.7723L2.91617 14.7744L11.7493 31.2516L20.5824 14.7745L20.5806 14.7723C21.3177 13.3972 21.7609 11.6504 21.7609 9.74613Z" stroke="#212020" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round"/>
</svg>`;
    cardTop.appendChild(likeImage)
    productDiv.appendChild(cardTop)

    const footerConatainer = document.createElement("div");
    footerConatainer.classList.add("footer-container")

    // Create rating stars dynamically
    const cartConatainer = document.createElement("div");
    cartConatainer.classList.add("cart-container")
    const ratingStarsContainer = document.createElement("span");
    ratingStarsContainer.classList.add("rating-stars");

    for (let i = 1; i <= 5; i++) {
        const ratingStar = document.createElement("span");
        ratingStar.classList.add("rating-star");
        ratingStar.dataset.value = i;
        ratingStar.innerHTML = `<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.412 1L14.6293 6.60932L21.824 7.51434L16.618 11.8781L17.8466 18.043L11.412 15.1308L4.97738 18.043L6.20599 11.8781L1 7.51434L8.19468 6.60932L11.412 1Z" stroke="black" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
        ratingStar.addEventListener("click", handleRatingClick);
        ratingStarsContainer.appendChild(ratingStar);
    }

    cartConatainer.appendChild(ratingStarsContainer);

    // Pre-select stars based on existing rating if applicable
    selectInitialStars(ratingStarsContainer, product.rating);


    var pricecontainer = document.createElement("div");
    pricecontainer.classList.add("prices");
    if (product.discount) {
        var price = document.createElement("p");
        price.classList.add("discount-price");
        price.textContent = "$" + parseFloat(product.priceDiscount).toFixed(2);
        price.style.color = "red"
        pricecontainer.appendChild(price);
    }
    var originalPrice = document.createElement("p");
    originalPrice.classList.add("product-original-price");

    originalPrice.textContent = "$" + parseFloat(product.priceOriginal).toFixed(2);
    originalPrice.style.textDecoration = product.discount ? 'line-through' : 'none';
    originalPrice.style.color = product.discount ? '#7E7979' : '#212020';
    pricecontainer.appendChild(originalPrice);



    cartConatainer.appendChild(pricecontainer);
    footerConatainer.appendChild(cartConatainer)

    var cart = document.createElement("button");
    cart.classList.add("add-cart");
    var cartImage = document.createElement('img')
    cartImage.src = './public/cart.svg';
    var cartText = document.createElement('span')
    cartText.textContent = "ADD TO CART";
    cart.appendChild(cartImage);
    cart.appendChild(cartText)
    footerConatainer.appendChild(cart)
    productDiv.appendChild(footerConatainer);

    return productDiv;
}

function handleRatingClick(event) {
    const target = event.target;
    const selectedValue = parseInt(target.dataset.value);

    const productDiv = document.getElementsByClassName("sproduct");
    // Update visual representation of stars
    const ratingStars = event.target.parentNode.querySelectorAll("rating-star");
    ratingStars.forEach((star) => {
        star.classList.toggle("selected", star.dataset.value <= selectedValue);
    });

    // Send updated rating to server or data storage
    // (replace with your server-side logic)
    fetch(`/api/products/${product.id}/rating`, {
        method: "POST",
        body: JSON.stringify({ rating: selectedValue }),
    })
        .then((response) => response.json())
        .then((data) => console.log("Rating updated:", data));
}

function selectInitialStars(ratingStarsContainer, rating) {
    const ratingStars = ratingStarsContainer.querySelectorAll(".rating-star");
    if (rating > 0) {
        for (let i = 0; i < rating; i++) {
            ratingStars[i].classList.add("selected");
            ratingStars[i].innerHTML = `<svg width="23" height="20" viewBox="0 0 23 20" fill="yellow" xmlns="http://www.w3.org/2000/svg">
<path d="M11.412 1L14.6293 6.60932L21.824 7.51434L16.618 11.8781L17.8466 18.043L11.412 15.1308L4.97738 18.043L6.20599 11.8781L1 7.51434L8.19468 6.60932L11.412 1Z" stroke="black" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
        }
    }
}

