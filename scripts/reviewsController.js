const mockAPI = "https://jsonplaceholder.typicode.com/comments"

const preloader = document.querySelector(".preloader");
const reviews = document.querySelector(".reviews-ul");
const error = document.querySelector(".error");

const pagesNavigation = document.querySelector(".pages-nav");
const previousButton = document.querySelector(".previous-button");
const pageNumberElement = document.querySelector(".page-number");
const nextButton = document.querySelector(".next-button");

let reviewList;
let pageNumber = 0;

const createReview = (review) => {
    const {
        name,
        email,
        body} = review

    return `<div class="review">
                <p>${name}</p>
                <p class="review-body">${body}</p>
                <p class="review-email">${email}</p>
        </div>`;
};

window.addEventListener("load", async () => {
    preloader.style.display = "block";
    pagesNavigation.style.display = "none";
    reviews.style.display = "none";
    error.style.display = "none";

    await fetch(mockAPI)
        .then(r => r.json())
        .then(data => {
            let min = getRandomNumber(0, 100);
            let max = min + getRandomNumber(50, 200);
            reviewList = data.slice(min, max);
            showCurrentPage()
            pagesNavigation.style.display = "flex";
            reviews.style.display = "block";
            preloader.style.display = "none";
            error.style.display = "none";
        })
        .catch(() => {
            error.style.display = "block";
            pagesNavigation.style.display = "none";
            preloader.style.display = "none";
            reviews.style.display = "none";
        });
});

const showCurrentPage = () => {
    reviews.innerHTML = "";

    let startElementNumber = pageNumber * 3;
    let endElementNumber = Math.min(startElementNumber + 3, reviewList.length - 1)

    reviewList.slice(startElementNumber, endElementNumber)
        .forEach(d => reviews.insertAdjacentHTML("afterbegin", createReview(d)));

    previousButton.style.display = startElementNumber === 0 ? "none" : "block";
    pageNumberElement.textContent = (pageNumber + 1).toString();
    nextButton.style.display = endElementNumber === reviewList.length - 1 ? "none" : "block";
}

previousButton.addEventListener("click", () => {
    pageNumber--;
    showCurrentPage()
})

nextButton.addEventListener("click", () => {
    pageNumber++;
    showCurrentPage()
})

const getRandomNumber = (min = 0, max = 100_000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}