import { fetchData } from './loadComponents.js'; // Assuming this method exists to fetch data from the server or file

export async function renderEvents() {
  const events = await fetchData("data/events.json"); // Fetch event data from the JSON file
  const container = document.getElementById("eventsList");
  container.innerHTML = ""; // Clear previous content

  if (events.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="2" class="text-center">No upcoming events scheduled.</td>
      </tr>
    `;
    return;
  }

  events.forEach((event) => {
    const eventRow = document.createElement("tr");

    eventRow.innerHTML = `
      <td class="calevent">
        <span class="eventmonth">${new Date(event.date).toLocaleString('default', { month: 'short' })}</span><br>
        <span class="monthdate">${new Date(event.date).getDate()}</span>
      </td>
      <td class="eventtitle">
        <a href="${event.link}" target="_blank">${event.title}</a>
        <span class="eventdescription">${event.description}</span>
      </td>
    `;

    container.appendChild(eventRow);
  });
}
