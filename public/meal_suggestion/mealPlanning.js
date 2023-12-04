const socket = io.connect;
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import dayGridPlugin from "@fullcalendar/daygrid"; // for dayGridMonth view

let calendar = new Calendar(calendarEl, {
  plugins: [interactionPlugin],

  // dateClick: function(info) {
  //   alert('Clicked on: ' + info.dateStr);

  //   // change the day's background color just for fun
  //   info.dayEl.style.backgroundColor = 'red';
  // }
});
