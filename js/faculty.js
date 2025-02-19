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
    deck.className = "card-rows"; // Bootstrap card-deck for a cohesive layout

    let currentRow;

    data.forEach((person, index) => {
      if (index % 3 === 0)
      {
        // Start a new row every 3 faculty members
        currentRow = document.createElement('div');
        currentRow.className = 'row g-4 mb-4';
        deck.appendChild(currentRow); // Append each row to the deck
      }

      // Individual card with margin
      const card = document.createElement('div');
      card.className = 'col-12 col-md-6 col-lg-4 mb-4';
      
      card.innerHTML = `
        <div class="card h-100">
          <img src="${person.photo}" class="card-img-top" alt="${person.name}" style="height: 200px; object-fit: cover;">
          <div class="card-body text-center">
          <h5 class="card-title">
            <a href="${person.website}" target="_blank">${person.name}</a>
          </h5> <!-- Name as the card title, centered -->
          <p class="card-text mt-2">${person.research}</p> <!-- Research as card text -->
        </div>
      `;

      currentRow.appendChild(card); // Append each card to the current-row
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
