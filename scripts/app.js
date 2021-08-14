// function that takes an array of characters and update each one with a card in the DOM
const updateCardsUI = characters => {
  const cardsList = document.getElementById("cardsList");
  cardsList.innerHTML = "";
  const fragment = new DocumentFragment();

  characters.forEach(character => {
    // create card template
    const cardElement = document.createElement("li");
    cardElement.classList.add("main__wrapper__cards__card");
    let cardHtml = `
    <h2 class="main__wrapper__cards__card__name">${character.fullName}</h2>
    <span class="main__wrapper__cards__card__title">${character.title}</span>
    <div class="main__wrapper__cards__card__img-container">
      <img class="main__wrapper__cards__card__img-container__img" src=${character.imageUrl}>
    </div>
    `;
    cardElement.innerHTML = cardHtml;

    fragment.appendChild(cardElement);
  })

  cardsList.appendChild(fragment);
};

// async function that fetches thrones api and returns characters data
const fetchCharacters = async () => {
  const url = "https://thronesapi.com/api/v2/Characters";

  const response = await fetch(url);
  
  if (!response.ok) throw new Error("Could not fetch data..."); // simple check

  const characters = await response.json();

  return updateCardsUI(characters);
};

// events
window.addEventListener("DOMContentLoaded", fetchCharacters);