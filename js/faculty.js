import { fetchData } from './loadComponents.js'; // Import fetchData function

export async function renderFaculty() {
  try {
    const data = await fetchData("data/faculty.json"); // Fetch faculty data
    const container = document.getElementById("faculty-content");

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
    deck.className = "card-columns"; // Bootstrap card-deck for a cohesive layout

    data.forEach((person) => {
      const card = document.createElement("div");
      card.className = "card mb-4"; // Individual card with margin

      card.innerHTML = `
        <img src="${person.photo}" class="card-img-top" alt="${person.name}" style="height: 200px; object-fit: cover;">
        <div class="card-body text-center">
          <h5 class="card-title">${person.name}</h5> <!-- Name as the card title, centered -->
          <p class="card-text mt-2">Research: ${person.research}</p> <!-- Research as card text -->
        </div>
        <div class="card-footer text-center">
          <a href="${person.website}" target="_blank" class="btn btn-primary">Go to Website</a> <!-- Button for the website link -->
        </div>
      `;

      deck.appendChild(card); // Append each card to the card-deck
    });

    container.appendChild(deck); // Append the card deck to the content container
  } catch (error) {
    console.error("Error rendering faculty content:", error);
    container.innerHTML = "<p>Error loading faculty data. Please try again later.</p>";
  }
}
