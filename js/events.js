//import { fetchData } from './loadComponents.js'; // Assuming this method exists to fetch data from the server or file
import 'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js';

export async function renderEvents() {
  const calendarId = 'c_0780285752b1af28e08e4be2aece213a9aa340f288755dd61f3b0b76e3972860@group.calendar.google.com';
  const apiKey = 'AIzaSyDSCWLIW5u9qFW1RCV_e75Cuw06n4QpdQc';
  const maxResults = 10;


  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${(new Date()).toISOString()}&maxResults=${maxResults}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const eventsList = document.getElementById('events');
      if (data.items && data.items.length > 0) {
        data.items.forEach(event => {
          const li = document.createElement('li');
          const start = event.start.dateTime || event.start.date;
          const formattedStart = dayjs(start).format('MMM D (ddd) hh:mm A');
          li.innerHTML = `<a href="${event.htmlLink}">${formattedStart} – ${event.summary}</a>`;
          eventsList.appendChild(li);

        });
      } else {
        eventsList.innerHTML = '<li>No upcoming events.</li>';
      }
    })
    .catch(error => console.error('Error fetching events:', error));

  /*
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
  */
}
