import { fetchData } from './loadComponents.js';

export async function renderSeminars() {
  const events = await fetchData("data/events.json");
  const container = document.getElementById("seminarsAccordion");
  container.innerHTML = ""; // Clear previous content

  if (events.length === 0) {
    container.innerHTML = `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" disabled>No upcoming seminars scheduled.</button>
        </h2>
      </div>`;
    return;
  }

  events.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "accordion-item";

    card.innerHTML = `
      <h2 class="accordion-header" id="seminarHeading${index}">
        <button class="accordion-button collapsed" 
                type="button" data-bs-toggle="collapse" 
                data-bs-target="#seminarCollapse${index}" 
                aria-expanded="false" 
                aria-controls="seminarCollapse${index}">
          ${event.title}
        </button>
      </h2>
      <div id="seminarCollapse${index}" 
           class="accordion-collapse collapse" 
           aria-labelledby="seminarHeading${index}" 
           data-bs-parent="#seminarsAccordion">
        <div class="accordion-body">
          <strong>Date:</strong> ${event.date}<br>
          <strong>Description:</strong> ${event.description}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
