/*
  All Utility functions go here
*/

// Function to extract time from a given date object
export function formatAMPM(date) { 
  // Convert UTC to EST
  const estOffset = -5 * 60 * 60000; // EST offset in milliseconds
  const estDate = new Date(date.getTime() + estOffset);

  let hours = estDate.getUTCHours();
  let minutes = estDate.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}
