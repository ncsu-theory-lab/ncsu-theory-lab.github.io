import { fetchData } from './loadComponents.js';

export async function renderLinks() {
  const links = await fetchData("data/links.json");
  const linksList = document.getElementById("links");
  linksList.innerHTML = ""; // Clear previous content

  if (links.length === 0) {
    container.innerHTML = `
      <li>No useful links available at the moment.</li>`;
    return;
  }

  links.forEach((link) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${link.url}" target="_blank">${link.text}</a>`;
    linksList.appendChild(li);
  });

  container.appendChild(list);
}
