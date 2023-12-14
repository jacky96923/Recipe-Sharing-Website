var calendarEl = document.getElementById("calendar");
var calendar = new FullCalendar.Calendar(calendarEl, {
  height: 550,
  dateClick: function (info) {
    // console.log(info.dateStr);
    console.log("dateClick:", info);
    document
      .querySelectorAll(".fc-day.selected")
      .forEach((el) => el.classList.remove("selected"));
    info.dayEl.classList.add("selected");

    loadSelectionResult(info.dateStr);
  },
});
calendar.render();

async function loadSelectionResult(date) {
  try {
    let res = await fetch(`/selectionResult/selection?date=${date}`);
    let json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }
    let mealSuggestionTemplate = document.querySelector("template").content;
    console.log(mealSuggestionTemplate);
    let mealScheduleContainer = document.querySelector("#meal_schedule");
    mealScheduleContainer.innerHTML = ``;
    let mealTypes = ["breakfast", "lunch", "dinner"];

    mealScheduleContainer.innerHTML = ``;
    for (let mealType of mealTypes) {
      let periodData = json.selectionResult.find((meal) => {
        return meal.period === mealType;
      });

      let node = mealSuggestionTemplate.cloneNode(true);
      let a = node.querySelector("a");
      let img = node.querySelector("img");
      node.querySelector(".meal_title").textContent = mealType;
      if (periodData) {
        img.src = `/upload/${periodData.image}`;
        a.href = `/recipes/recipes.html?id=${periodData.recipe_id}`;
      } else {
        img.classList.toggle("meal_image");
        a.href =
          "/filterResult/filterResult.html?" +
          new URLSearchParams({ mealType, date });
      }
      mealScheduleContainer.appendChild(node);
    }
  } catch (error) {
    console.error("error loading content:", error);
  }
}

//call backend
//response the json
