import { fetchData } from './loadComponents.js';

export async function renderCourses() {
  const courses = await fetchData("data/courses.json");
  const coursesList= document.getElementById("courses");
  coursesList.innerHTML = ""; // Clear previous content

  if (courses.length === 0) {
    coursesList.innerHTML = `<li>No courses available at the moment.</li>`;
    return;
  }

  courses.forEach((course) => {
  const li = document.createElement("li");

  li.innerHTML = `<a href="${course.link}">${course.name}</a>`;
  coursesList.appendChild(li);
});

}
