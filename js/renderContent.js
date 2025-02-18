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
  const tabs = document.querySelectorAll('.btn'); // Select all buttons
  tabs.forEach(tab => {
    if (tab === activeTab) {
      tab.classList.remove('btn-secondary'); // Remove inactive style
      tab.classList.add('btn-primary');      // Add active style
    } else {
      tab.classList.remove('btn-primary');   // Remove active style
      tab.classList.add('btn-secondary');    // Add inactive style
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('mouseover', function(event) {
      const titleContainer = event.target.closest('.title-container');
      if (titleContainer) {
          const tooltip = document.createElement('div');
          tooltip.className = 'tooltip';
          tooltip.textContent = titleContainer.getAttribute('data-tooltip');
          titleContainer.appendChild(tooltip);
          // const rect = titleContainer.getBoundingClientRect();

          positionTooltip(tooltip, titleContainer);
      }
  });

  document.body.addEventListener('mouseout', function(event) {
      const titleContainer = event.target.closest('.title-container');
      if (titleContainer) {
          const tooltip = titleContainer.querySelector('.tooltip');
          if (tooltip) {
              tooltip.remove();
          }
      }
  });

  /* To position the tooltip for displaying abstract */
  function positionTooltip(tooltip, target) {
    const rect = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Set initial width
    tooltip.style.width = 'auto'; // Reset to auto to measure content width
    const contentWidth = tooltip.offsetWidth;
    tooltip.style.width = `${Math.min(contentWidth, 400)}px`; // Set width, max 300px

    // Calculate percentage positions
    let topPercentage = (rect.top / viewportHeight) * 100;
    let leftPixels = rect.left - tooltip.offsetWidth - 80; // 80px further to the left

    // Adjust if tooltip goes off-screen to the left
    if (leftPixels < 0) {
      // Position to the right of the container instead
      leftPixels = rect.right + 80; // 80px to the right
    }

    // Convert left position to percentage
    let leftPercentage = (leftPixels / viewportWidth) * 100;

    // Adjust if tooltip goes off-screen vertically
    const tooltipRect = tooltip.getBoundingClientRect();
    if (rect.top + tooltipRect.height > viewportHeight) {
      topPercentage = ((viewportHeight - tooltipRect.height) / viewportHeight) * 100;
    }

    // Set final position
    tooltip.style.top = `${topPercentage}%`;
    tooltip.style.left = `${leftPercentage}%`;
  }
});
