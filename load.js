
function loadPage(page, element) {
    // Remove the 'active' class from all menu items
    // const elementClass = element.className;
    // console.log(elementClass);
    // document.getElementById(elementClass).addEventListener("click", function () {
        window.location.href = page;
    // });
}

function sigunUp(button) {
    const emailInput = button.parentElement.querySelector(".email-address");
    const email = emailInput.value.trim();

    if (email) {
        alert("Sign Up Successfully with email: " + email);
    } else {
        alert("Please enter your email address.");
    }
}