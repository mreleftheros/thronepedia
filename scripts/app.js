
const fetchCharacters = async () => {
  const url = "https://thronesapi.com/api/v2/Characters";

  const response = await fetch(url);
  
  if (!response.ok) throw new Error("Could not fetch data..."); // simple check

  const data = await response.json();

  console.log(data)
};

fetchCharacters()