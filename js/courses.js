import { fetchData } from './loadComponents.js';

export async function renderCourses() {
  const courses = await fetchData("data/courses.json");
  const container = document.getElementById("coursesList");
  container.innerHTML = ""; // Clear previous content

  if (courses.length === 0) {
    container.innerHTML = `
      <div class="list-group-item">
        <h5 class="mb-1">No courses available at the moment.</h5>
      </div>`;
    return;
  }

  courses.forEach((course) => {
    const listItem = document.createElement("a");
    listItem.className = "list-group-item list-group-item-action flex-column align-items-start";

    listItem.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${course.name}</h5>
      </div>
      <p class="mb-1">${course.description}</p>
    `;
    container.appendChild(listItem);
  });
}
