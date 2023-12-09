const form = document.querySelector("form")
const widget = document.querySelector("rating-widget")
form.style.display = "none"
const stars = document.createElement("div")
const root = document.documentElement;
var number = parseInt(form.querySelector('#rating').max)
number = Math.max(Math.min(number, 10), 3)
var rating = 0
for (let i = 1; i <= number; i++) {
    const star = document.createElement("span");
    star.innerHTML = "&#9733;";
    star.dataset.value = i;
    star.addEventListener("click", starClick);
    star.addEventListener("mouseover", starHover);
    stars.appendChild(star);
    star.style.color = "gray";
    star.style.fontSize = "36px";
    star.style.cursor = "pointer"
}
widget.appendChild(stars);
const starList = document.querySelectorAll("span");
function starHover(e) {
    rating = e.target.dataset.value;
    starList.forEach(star => {
        if (parseInt(star.dataset.value) <= rating) {
            star.style.color = getComputedStyle(root).getPropertyValue("--active-color");
        } else {
            star.style.color = getComputedStyle(root).getPropertyValue("--inactive-color");
        }
    });

}

function starClick(e) {
    const msg = document.createElement("p");
    msg.innerHTML = rating / number >= 0.8 ? `Thanks for ${rating} star rating!` : `Thanks for your feedback of ${rating} stars. We'll try to do better!`
    stars.style.display = "none";
    widget.appendChild(msg);

    const formData = new FormData();
    formData.append("question", "How satisfied are you?");
    formData.append("rating", rating);
    formData.append("sentBy", "JS");

    fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'X-Sent-By': 'JS',
        },
        body: formData,
      })
      .then((response) => response.json())
      .then(console.log); 
}