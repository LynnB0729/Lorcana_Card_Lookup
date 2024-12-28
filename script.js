const jsonUrl = "https://raw.githubusercontent.com/LynnB0729/Lorcana/refs/heads/main/Pokemon%20JSON.json";

let cards = [];

// Fetch JSON data
fetch(jsonUrl)
  .then(response => response.json())
  .then(data => {
    cards = data.cards;
    console.log("JSON data loaded successfully.");
    console.log(cards.slice(0, 5)); // Log the first few cards for inspection
  })
  .catch(error => console.error("Error fetching JSON data:", error));

// DOM Elements
const setNumberInput = document.getElementById("set-number");
const cardNumberInput = document.getElementById("card-number");
const findCardButton = document.getElementById("find-card");
const resetButton = document.getElementById("reset");
const cardDetailsSection = document.getElementById("card-details");

// Event Listener for Find Card Button
findCardButton.addEventListener("click", () => {
  const setNumber = setNumberInput.value.trim();
  const cardNumber = cardNumberInput.value.trim();

  if (!setNumber || !cardNumber) {
    alert("Please enter both set number and card number.");
    return;
  }

  // Convert both setCode and number to strings for comparison
  const card = cards.find(card => 
    String(card.setCode) === String(setNumber) && String(card.number) === String(cardNumber)
  );

  if (card) {
    displayCard(card);
  } else {
    alert("Card not found. Please check the set number and card number.");
  }
});

// Event Listener for Reset Button
resetButton.addEventListener("click", resetSearch);

// Display Card Details
function displayCard(card) {
  cardDetailsSection.innerHTML = `
    <div class="card">
      <img src="${card.images?.thumbnail || ''}" alt="${card.name}">
      <div class="card-info">
        <h2>${card.name}</h2>
        <p><strong>Set:</strong> ${card.setCode}</p>
        <p><strong>Number:</strong> ${card.number}</p>
        <p><strong>Lore:</strong> ${card.lore || "N/A"}</p>
        <p><strong>Cost:</strong> ${card.cost || "N/A"}</p>
        <p><strong>Type:</strong> ${card.type || "N/A"}</p>
        <p><strong>Abilities:</strong> ${card.abilities ? card.abilities.map(a => a.fullText).join(", ") : "None"}</p>
      </div>
    </div>
  `;
  cardDetailsSection.style.display = "block";
}

// Reset Search
function resetSearch() {
  setNumberInput.value = "";
  cardNumberInput.value = "";
  cardDetailsSection.innerHTML = "";
  cardDetailsSection.style.display = "none";
}
