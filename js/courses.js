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
  const listItem = document.createElement("div");
  listItem.className = "list-group-item";

  listItem.innerHTML = `
    <h5><a href="${course.link}" target="_blank">${course.name}</a></h5>
    <p>${course.description}</p>
  `;
  container.appendChild(listItem);
});

}
