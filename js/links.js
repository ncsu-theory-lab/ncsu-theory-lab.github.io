import { fetchData } from './loadComponents.js';

export async function renderLinks() {
  const links = await fetchData("data/links.json");
  const container = document.getElementById("links");
  const list = document.createElement("ul");
  list.className = "list-unstyled"; // Optional class for styling if needed
  container.innerHTML = ""; // Clear previous content

  if (links.length === 0) {
    container.innerHTML = `
      <p>No useful links available at the moment.</p>`;
    return;
  }

  links.forEach((link) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      - <a href="${link.url}" target="_blank">${link.text}</a>`;
    list.appendChild(listItem);
  });

  container.appendChild(list);
}
