const windows = {
    index: "Описание",
    constructor: "Конструктор",
    documentation: "Документация",
    suggestions: "Предложения",
    reviews: "Отзывы"
}

const headerItems = document.querySelectorAll(".header-item");
const directories = document.location.href.split("/")
const currentWindow = directories[directories.length - 1].split(".")[0];
const currentWindowName = windows[currentWindow];

headerItems.forEach(i => {
    if (i.textContent === currentWindowName) {
        i.classList.add("header-item-selected");
        i.classList.remove("header-item");
    }
});