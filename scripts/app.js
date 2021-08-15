const searchInput = document.getElementById("searchInput");
const resultsMessage = document.getElementById("resultsMessage");

// function that takes totalResults number and outputs it in the DOM
const createResultsMessageUI = results => {
  let message = results > 0 ? `${results} results found.` : "0 results found.";

  resultsMessage.innerHTML = `<p class="main__wrapper__results__message">${message}</p>`;
};

// function that takes an array of characters and update each one with a card in the DOM
const updateCardsUI = (characters, value) => {
  if (!value) value = "";
  value = value.toLowerCase();
  const cardsList = document.getElementById("cardsList");
  cardsList.innerHTML = "";
  const fragment = new DocumentFragment();
  const len = value.length;
  let totalResults = 0;
  
  characters.forEach(character => {
    const name = character.fullName.toLowerCase();
    const title = character.title.toLowerCase();

    if (len > 0) {
      if (name.indexOf(value) === -1 && title.indexOf(value) === -1) return;
    }

    totalResults++;

    // create card template
    const cardElement = document.createElement("li");
    cardElement.classList.add("main__wrapper__cards__card");
    let cardHtml = `
    <h2 class="main__wrapper__cards__card__name">${character.fullName}</h2>
    <span class="main__wrapper__cards__card__title">${character.title}</span>
    <div class="main__wrapper__cards__card__img-container">
      <img width="200" height="200" class="main__wrapper__cards__card__img-container__img" src=${character.imageUrl}>
    </div>
    `;
    cardElement.innerHTML = cardHtml;

    fragment.appendChild(cardElement);
  })

  createResultsMessageUI(totalResults);
  
  cardsList.appendChild(fragment);
};

// async function that fetches thrones api and returns characters data
const fetchCharacters = async e => {
  const url = "https://thronesapi.com/api/v2/Characters";
  const searchValue = e.target.value;

  const response = await fetch(url);
  
  if (!response.ok) throw new Error("Could not fetch data..."); // simple check

  const characters = await response.json();

  return updateCardsUI(characters, searchValue);
};

// events
window.addEventListener("DOMContentLoaded", fetchCharacters);
searchInput.addEventListener("input", fetchCharacters);