import { fetchData } from './loadComponents.js'; // Assuming this method exists to fetch data from the server or file
import { formatAMPM } from './util.js'; 

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

    const currentDate = new Date(new Date().getTime() - (2 * 60 * 60 * 1000));
    const eventDate = new Date(event.date);

    if(currentDate <= eventDate)
    {
      eventRow.innerHTML = `
        <td class="calevent">
          <span class="eventmonth">${eventDate.toLocaleString('default', { month: 'short' })}</span><br>
          <span class="monthdate">${eventDate.getDate()}</span>
        </td>
        <td class="eventtitle">
          <div class="title-container" data-tooltip="${event.abstract}">
            <a>${event.title}</a>
            <button class="info-button" id="infoButton">i</button>
            <span class="eventspeaker"><a href="${event.speaker_profile}" target="_blank">${event.speaker}</a></span>
            <span class="eventvenue">${formatAMPM(new Date(event.date))} | ${event.venue}</span>
          </div>
        </td>
      `;

      container.appendChild(eventRow);
    }
  });
}
