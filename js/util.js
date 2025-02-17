/*
  All Utility functions go here
*/

// Function to extract time from a given date object
export function formatAMPM(date) {
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}
