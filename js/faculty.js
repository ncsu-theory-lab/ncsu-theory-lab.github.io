import { fetchData } from './loadComponents.js'; // Import fetchData function

export async function renderFaculty() {
  try {
    const data = await fetchData("data/faculty.json"); // Fetch faculty data
    const container = document.getElementById("faculty-content-container");

    if (!container) {
      console.error("Content container not found.");
      return;
    }

    container.innerHTML = ""; // Clear previous content

    if (data.length === 0) {
      container.innerHTML = "<p>No faculty members found.</p>"; // Handle empty data gracefully
      return;
    }

    const deck = document.createElement("div");
    deck.className = "card-deck"; // Bootstrap card-deck for a cohesive layout

    data.forEach((person, index) => {
      const card = document.createElement('div');
      card.className = "card mx-3 mb-3";
      
      card.innerHTML = `
          <img src="${person.photo}" class="card-img-top" alt="${person.name}">
          <div class="card-body text-center">
            <h6 class="card-title mb-0">
              <a href="${person.website}" target="_blank">${person.name}</a>
            </h6>
            <small class="mb-0">${person.research}</small>
      `;

      deck.appendChild(card); // Append each card to the current-row
    });

    container.appendChild(deck); // Append the card deck to the content container
  } catch (error) {
    console.error("Error rendering faculty content:", error);
    const container = document.getElementById("faculty-content-container");
    if (container) {
      container.innerHTML = "<p>Error loading faculty data. Please try again later.</p>";
    }
  }
}
