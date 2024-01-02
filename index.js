document.addEventListener("DOMContentLoaded", function () {
    // Dynamic JSON data
    const products = [
        {
            "id": 1,
            "image": "./public/rectangle-14@2x.png",
            "category": "Fashion",
            "name": "Dress Green & Gold",
            "priceOriginal": 80.00,
            "priceDiscount": 70.00,
            "discount": true,
            "discountPercentage": 10,
            "rating": 5
        },
        {
            "id": 2,
            "image": "./public/rectangle-15@2x.png",
            "category": "Shoes",
            "name": "Shoes",
            "priceOriginal": 95.00,
            "priceDiscount": 95.00,
            "discount": false,
            "discountPercentage": 0,
            "rating": 5
        },
        {
            "id": 3,
            "image": "./public/rectangle-16@2x.png",
            "category": "Bag",
            "name": "Shoulder Bag",
            "priceOriginal": 65.00,
            "priceDiscount": 45.00,
            "discount": true,
            "discountPercentage": 20,
            "rating": 5
        }
        // Add more products as needed
    ];
    // Create product cards efficiently
    const productList = document.getElementById("product-list");
    products.forEach((product) => {
        const productDiv = createProductCard(product);
        productList.appendChild(productDiv);
    });
});

function createProductCard(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    if (product.discount) {
        var discount = document.createElement("p");
        discount.classList.add("product-discount");

        discount.textContent = "-" + parseFloat(product.discountPercentage).toFixed(2) + "%";
        productDiv.appendChild(discount);
    }
    // Create individual elements using createElement and set content
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.classList.add("product-image");
    productDiv.appendChild(img);


    var name = document.createElement("p");
    name.classList.add("product-name");
    name.textContent = product.name;
    productDiv.appendChild(name);


    var pricecontainer = document.createElement("div");
    pricecontainer.classList.add("price-container");

    var originalPrice = document.createElement("p");
    originalPrice.classList.add("product-price");

    originalPrice.textContent = "$" + parseFloat(product.priceOriginal).toFixed(2);
    originalPrice.style.textDecoration = product.discount ? 'line-through' : 'none';
    originalPrice.style.color = product.discount ? '#7E7979' : '#212020';
    pricecontainer.appendChild(originalPrice);

    if (product.discount) {
        var price = document.createElement("p");
        price.classList.add("product-discount-price");
        price.textContent = "$" + parseFloat(product.priceDiscount).toFixed(2);
        pricecontainer.appendChild(price);
    }

    productDiv.appendChild(pricecontainer);

    // ... (Create other elements similarly using createElement and textContent)

    // Create rating stars dynamically
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

    productDiv.appendChild(ratingStarsContainer);

    // Pre-select stars based on existing rating if applicable
    selectInitialStars(ratingStarsContainer, product.rating);
    var category = document.createElement("p");
    category.classList.add("product-category");

    category.textContent = product.category;
    productDiv.appendChild(category);

    return productDiv;
}

function handleRatingClick(event) {
    const target = event.target;
    const selectedValue = parseInt(target.dataset.value);

    const productDiv = document.getElementsByClassName("product");
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
