import { renderAbout } from './about.js';
import { renderSeminars } from './events.js';
import { renderCourses } from './courses.js';

export async function loadComponents() {
  try {
    renderAbout(); // Render the About section
    await renderSeminars(); // Load seminars
    await renderCourses(); // Load courses
    console.log("All components loaded successfully.");
  } catch (error) {
    console.error("Error loading components:", error);
  }
}

// Utility function for fetching data
export async function fetchData(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${file}:`, error);
    return [];
  }
}
