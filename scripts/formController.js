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

    const maxSymbolsInLine = 45;
    const splitSuggestions = suggestion.split("\n");
    for (let i = 0; i < splitSuggestions.length; i++) {
        let j = 0;

        while (true) {
            if (j > splitSuggestions.length)
                break;

            j += maxSymbolsInLine;

            splitSuggestions[i] = [splitSuggestions[i].slice(0, j), splitSuggestions[i].slice(j)].join("<br>");
        }
    }

    return `<div class="suggestion">
        <p>
            ${splitSuggestions.join("<br>")}
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
    const suggestion = document.querySelector(".suggestions-text");
    const trimmedSuggestion = suggestion.value.trim();
    if (trimmedSuggestion.length < 10) {
        const errorText = trimmedSuggestion.length === 0
            ? "Поле пустое"
            : "Идея слишком короткая";

        // Send alert through notie
        notie.alert({
            // Type 3 stands for error
            type: 3,
            // Time in witch notification will disappear
            time: 2,
            text: errorText
        })
        return;
    }

    // Send confirmation on action through notie
    notie.confirm({
        text: "Отправить",
        // Text for accept and decline
        submitText: "Да",
        cancelText: "Отмена",
        // Position of confirmation popup
        position: "bottom"
    },
        //Callback function on accept
        () => {
            const suggestionHtml = createSuggestion(trimmedSuggestion);
            grid.insertAdjacentHTML("afterbegin", suggestionHtml);
            const suggestions = getSuggestions();
            suggestions.unshift(suggestionHtml);
            localStorage.setItem(localStorageKey, JSON.stringify(suggestions));
            suggestion.value = "";
    })
});

const getSuggestions = () => {
    const list = JSON.parse(localStorage.getItem(localStorageKey));
    return list ? list : [];
};