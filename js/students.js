import { fetchData } from './loadComponents.js'; // Import fetchData function

export async function renderStudents() {
  try {
    const data = await fetchData("data/students.json"); // Fetch student data
    const container = document.getElementById("students-content");

    if (!container) {
      console.error("Content container not found.");
      return;
    }

    container.innerHTML = ""; // Clear previous content

    if (data.length === 0) {
      container.innerHTML = "<p>No students found.</p>"; // Handle empty data gracefully
      return;
    }

    const row = document.createElement("div");
    row.className = "row"; // Bootstrap row to contain student cards

    data.forEach((person) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4"; // 3 cards per row on medium screens and up

      card.innerHTML = `
        <div class="card h-100 text-center">
          <img src="${person.photo}" class="card-img-top" alt="${person.name}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${person.name}</h5>
            <p class="card-text">Research: ${person.research}</p>
            <a href="${person.website}" target="_blank" class="btn btn-primary">Website</a>
          </div>
        </div>
      `;

      row.appendChild(card); // Append each card to the row
    });

    container.appendChild(row); // Append the row to the content container
  } catch (error) {
    console.error("Error rendering student content:", error);
    container.innerHTML = "<p>Error loading student data. Please try again later.</p>";
  }
}
