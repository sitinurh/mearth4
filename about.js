document.addEventListener("DOMContentLoaded", function () {
    const abouts = [
        {
            "id": 1,
            "image": "./public/ellipse-11@2x.png",
            "comment": "Never regret buying clothes here, they are all beautiful",
            "name": "Yeri",
            "rating": 5
        },
        {
            "id": 2,
            "image": "./public/ellipse-12@2x.png",
            "comment": "the coolest shop in my opinion, with such cheap prices you can get this good quality,i really recommend this",
            "name": "Jay",
            "rating": 5
        },
        {
            "id": 3,
            "image": "./public/ellipse-13@2x.png",
            "comment": "I become a regular and I have never regretted buying things at this shop. It is cute and the shop continues to be a success.",
            "name": "Arumi",
            "rating": 5
        }
    ];
    const aboutList = document.getElementById("about-list");
    abouts.forEach((about) => {
        const aboutDivs = createaboutCard(about);
        aboutList.appendChild(aboutDivs);
    });
});

function createaboutCard(about) {
    const aboutDiv = document.createElement("div");
    aboutDiv.classList.add("about");

    const img = document.createElement("img");
    img.src = about.image;
    img.alt = about.name;
    img.classList.add("about-image");
    aboutDiv.appendChild(img);

    const grayPart = document.createElement("div")
    grayPart.classList.add("testi-bg")

    var comment = document.createElement("p");
    comment.classList.add("about-comment");
    comment.textContent = about.comment;
    grayPart.appendChild(comment);


    var nameRating = document.createElement("p");
    nameRating.classList.add('name-rating')
    var name = document.createElement("p");
    name.classList.add("about-name");
    name.textContent = about.name;
    nameRating.appendChild(name);

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
        ratingStarsContainer.appendChild(ratingStar);
    }

    nameRating.appendChild(ratingStarsContainer);
    selectInitialStars(ratingStarsContainer, about.rating);
    grayPart.appendChild(nameRating);
    aboutDiv.appendChild(grayPart);

    return aboutDiv;
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