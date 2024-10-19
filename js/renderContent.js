import { loadComponents } from './loadComponents.js';
import { renderFaculty } from './faculty.js';
import { renderStudents } from './students.js';

document.addEventListener('DOMContentLoaded', async function () {
  try {
    await loadComponents(); // Load initial components

    // Get references to the tabs
    const facultyTab = document.getElementById("faculty-tab");
    const studentsTab = document.getElementById("students-tab");

    if (facultyTab && studentsTab) {
      // Show faculty content by default
      await renderFaculty();
      switchToTab("faculty-content", "students-content");
      setActiveTab(facultyTab); // Set active class on faculty tab

      // Add event listeners for tab switching
      facultyTab.addEventListener("click", async () => {
        await renderFaculty(); // Show faculty content
        switchToTab("faculty-content", "students-content");
        setActiveTab(facultyTab); // Set active class for faculty tab
      });

      studentsTab.addEventListener("click", async () => {
        await renderStudents(); // Show student content
        switchToTab("students-content", "faculty-content");
        setActiveTab(studentsTab); // Set active class for students tab
      });
    } else {
      console.error("Tabs not found. Check element IDs in HTML.");
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});

// Helper function to handle tab switching logic
function switchToTab(showId, hideId) {
  const showElement = document.getElementById(showId);
  const hideElement = document.getElementById(hideId);

  if (showElement && hideElement) {
    showElement.style.display = 'block'; // Show the selected tab content
    hideElement.style.display = 'none';   // Hide the other tab content
  } else {
    console.error(`Element with ID ${showId} or ${hideId} not found.`);
  }
}

// Helper function to set the active tab
function setActiveTab(activeTab) {
  const tabs = document.querySelectorAll('.nav-link'); // Select all tabs
  tabs.forEach(tab => {
    tab.classList.remove('active'); // Remove active class from all tabs
  });
  activeTab.classList.add('active'); // Add active class to the clicked tab
}
