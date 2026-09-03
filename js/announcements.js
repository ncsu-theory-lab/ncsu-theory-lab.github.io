import { fetchData } from './loadComponents.js';

export async function renderAnnouncements() {
  const announcements = await fetchData("data/announcements.json");
  const container = document.getElementById("announcements");

  if (!container) {
    throw new Error("Announcements container not found.");
  }

  // Remove an old toggle button if this function is called again
  const oldToggle = document.querySelector(".announcements-toggle");
  if (oldToggle) {
    oldToggle.remove();
  }

  container.innerHTML = "";

  if (announcements.length === 0) {
    container.innerHTML = `
      <p class="announcement-empty">No recent announcements.</p>
    `;
    return;
  }

  // Show the most recent announcement in the sidebar teaser
  const latestContainer = document.getElementById("latest-announcement-content");

  if (latestContainer && announcements.length > 0) {
    const latest = announcements[0];

    latestContainer.innerHTML = `
      <div class="latest-announcement-meta">

        <span class="latest-announcement-date">
          ${latest.date}
        </span>

        <span class="latest-announcement-category">
          ${latest.category}
        </span>

      </div>

      <p class="latest-announcement-text">
        ${latest.text}
      </p>

      ${latest.url
        ? `
          <a href="${latest.url}" target="_blank" rel="noopener noreferrer" class="latest-announcement-readmore">
              Read more →
          </a>
          `
          : ""
      }
    `;
  }

  announcements.forEach((announcement, index) => {
    const item = document.createElement("article");

    item.className =
      index === 0
        ? "announcement-item announcement-featured reveal"
        : "announcement-item reveal";

    item.innerHTML = `

      <div class="announcement-icon">
        ${getAnnouncementIcon(announcement.category)}
      </div>

      <div class="announcement-body">

        <div class="announcement-meta">

          <span class="announcement-date">
            ${announcement.date}
          </span>

          <span class="announcement-category">
            ${announcement.category}
          </span>

          ${
            index === 0
              ? `<span class="latest-badge">Latest</span>`
              : ""
          }

        </div>

        <p class="announcement-text">
          ${announcement.text}
        </p>

        ${
          announcement.url
            ? `
              <a
                href="${announcement.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="announcement-link"
              >
                Read more
                <span aria-hidden="true">→</span>
              </a>
            `
            : ""
        }

      </div>
    `;

    if (index >= 5) {
      item.hidden = true;
      item.classList.add("extra-announcement");
    }

    container.appendChild(item);
  });

  // Add "Show more" button
  if (announcements.length > 5) {
  
    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "announcements-toggle";

    const extraCount = announcements.length - 5;

    toggleButton.textContent =
      `Show ${extraCount} more announcement${extraCount === 1 ? "" : "s"} ↓`;

    let expanded = false;

    toggleButton.addEventListener("click", () => {
      expanded = !expanded;

      container.querySelectorAll(".extra-announcement").forEach(item => {
        item.hidden = !expanded;
      });

      toggleButton.textContent = expanded
        ? "Show fewer ↑"
        : `Show ${extraCount} more announcement${extraCount === 1 ? "" : "s"} ↓`;
    });

    container.after(toggleButton);
  }

  initializeAnnouncementAnimations();
}


/*
 * Small icons for each announcement category.
 * These are inline SVGs, so no additional icon library is needed.
 */
function getAnnouncementIcon(category) {

  const icons = {

    Paper: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 2h9l5 5v15H6V2zm8 2v5h5M9 13h8M9 17h8M9 9h2"/>
      </svg>
    `,

    Award: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="5"/>
        <path d="M9 12l-2 10 5-3 5 3-2-10"/>
      </svg>
    `,

    Position: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="1"/>
        <path d="M9 7V4h6v3M3 12h18"/>
      </svg>
    `,

    Graduation: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 9l10-5 10 5-10 5L2 9z"/>
        <path d="M6 11v5c3 3 9 3 12 0v-5"/>
      </svg>
    `,

    Talk: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h16v12H8l-4 4V4z"/>
      </svg>
    `
  };

  return icons[category] || `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 8v5M12 17h.01"/>
    </svg>
  `;
}


/*
 * Reveal announcements gently as they enter the viewport.
 */
function initializeAnnouncementAnimations() {

  const items = document.querySelectorAll(".announcement-item.reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  items.forEach(item => observer.observe(item));
}