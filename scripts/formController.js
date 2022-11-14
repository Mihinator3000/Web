const form = document.querySelector(".suggestions-form");
const clearButton = document.querySelector(".clear-button");
const grid = document.querySelector(".suggestions-grid");

const localStorageKey = "suggestions-key";

window.addEventListener("load", () => {
    const suggestions = getSuggestions();
    suggestions.forEach(s => {
        grid.insertAdjacentHTML("afterbegin", s);
    });
});

clearButton.addEventListener("click", () => {
    localStorage.clear();
    [...grid.childNodes].forEach(n => grid.removeChild(n));
})

const createSuggestion = (suggestion) => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    return `<div class="suggestion">
        <p>
            ${suggestion.split("\n").join("<br>")}
        </p>
        <br>
        <p class="suggestion-date">
            ${date.toLocaleTimeString()}
            ${formattedDate}
        </p>
    </div>`;
};

form.addEventListener("submit", event => {
    event.preventDefault();
    const suggestion = document.querySelector(".suggestions-text")
    const trimmedSuggestion = suggestion.value.trim()
    if (trimmedSuggestion === "") {
        return
    }

    const suggestionHtml = createSuggestion(trimmedSuggestion)
    grid.insertAdjacentHTML("afterbegin", suggestionHtml);
    const suggestions = getSuggestions();
    suggestions.unshift(suggestionHtml);
    localStorage.setItem(localStorageKey, JSON.stringify(suggestions));
    suggestion.value = ""
});

const getSuggestions = () => {
    const list = JSON.parse(localStorage.getItem(localStorageKey));
    return list ? list : [];
};