import { fetchData } from './loadComponents.js'; // Import fetchData function

export async function renderAbout() {
  try {
    const data = await fetchData("data/about.json"); // Fetch about data
    const container = document.getElementById("about-content"); // Target the about-content div

    if (!container) {
      console.error("About content container not found.");
      return;
    }

    // Clear previous content
    container.innerHTML = "";

    // Render the description
    if (data.description) {
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = data.description;
      container.appendChild(descriptionElement);
    }

    // Render research areas
    if (data.researchAreas && data.researchAreas.length > 0) {
      const researchList = document.createElement("ul");
      data.researchAreas.forEach(area => {
        const listItem = document.createElement("li");
        listItem.textContent = area;
        researchList.appendChild(listItem);
      });
      container.appendChild(researchList);
    }

  } catch (error) {
    console.error("Error rendering about content:", error);
    const container = document.getElementById("about-content");
    if (container) {
      container.innerHTML = "<p>Error loading about data. Please try again later.</p>";
    }
  }
}
