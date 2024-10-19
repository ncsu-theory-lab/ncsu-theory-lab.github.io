import { fetchData } from './loadComponents.js';

export async function renderCourses() {
  const courses = await fetchData("data/courses.json");
  const container = document.getElementById("coursesAccordion");
  container.innerHTML = ""; // Clear previous content

  if (courses.length === 0) {
    container.innerHTML = `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" disabled>No courses available at the moment.</button>
        </h2>
      </div>`;
    return;
  }

  courses.forEach((course, index) => {
    const card = document.createElement("div");
    card.className = "accordion-item";

    card.innerHTML = `
      <h2 class="accordion-header" id="courseHeading${index}">
        <button class="accordion-button collapsed" 
                type="button" data-bs-toggle="collapse" 
                data-bs-target="#courseCollapse${index}" 
                aria-expanded="false" 
                aria-controls="courseCollapse${index}">
          ${course.name}
        </button>
      </h2>
      <div id="courseCollapse${index}" 
           class="accordion-collapse collapse" 
           aria-labelledby="courseHeading${index}" 
           data-bs-parent="#coursesAccordion">
        <div class="accordion-body">
          <strong>Description:</strong> ${course.description}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
