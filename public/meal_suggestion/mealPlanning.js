document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    height: 550,
    dateClick: function (info) {
      console.log(info.dateStr);
      console.log(info);
      document
        .querySelectorAll(".fc-day.selected")
        .forEach((el) => el.classList.remove("selected"));
      info.dayEl.classList.add("selected");
      //call backend
      //response the json
    },
  });
  calendar.render();
});

window.selectMealType = selectMealType;

function selectMealType(mealType) {
  let element = document.querySelector(".fc-day.selected"); //query select calendar 嗰一日
  if (!element) {
    alert("please select a date first");
    return;
  }
  let date = element.dataset.date;
  console.log({ mealType, date });
  location.href =
    "/filterResult/filterResult.html?" +
    new URLSearchParams({ mealType, date });
}
