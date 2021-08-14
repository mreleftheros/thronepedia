

const updateCardsUI = characters => {
  const cardsList = document.getElementById("cardsList");
  const fragment = new DocumentFragment();

  characters.forEach(character => {
    // create card
    const cardElement = document.createElement("li");
    cardElement.classList.add("main__wrapper__cards__card");
    cardElement.innerHTML = character.fullName;

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