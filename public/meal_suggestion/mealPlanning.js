document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    height: 550,
    dateClick: function (info) {
      // console.log(info.dateStr);
      // console.log(info);
      document
        .querySelectorAll(".fc-day.selected")
        .forEach((el) => el.classList.remove("selected"));
      info.dayEl.classList.add("selected");

      loadSelectionResult(info.dateStr);
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
    let periodArr = ["breakfast", "lunch", "dinner"];

    mealScheduleContainer.innerHTML = ``;
    for (let period of periodArr) {
      let periodData = json.selectionResult.filter((meal) => {
        return meal.period === period;
      });

      if (periodData.length > 0) {
        let node = mealSuggestionTemplate.cloneNode(true);

        node.querySelector(".meal_title").textContent = periodData[0].period;
        node.querySelector("img").src = `/upload/${periodData[0].image}`;

        let buttons = node.querySelectorAll("button");
        for (let button of buttons) {
          button.addEventListener("click", () => {
            window.location = `/recipes/recipes.html?id=${periodData[0].recipe_id}`;
          });
        }

        mealScheduleContainer.appendChild(node);
      } else {
        let node = mealSuggestionTemplate.cloneNode(true);
        node.querySelector(".meal_title").textContent = period;
        node.querySelector("img").classList.toggle("meal_image");
        let buttons = node.querySelectorAll("button");
        for (let button of buttons) {
          button.addEventListener("click", () => selectMealType(period));
        }
        mealScheduleContainer.appendChild(node);
      }
    }
  } catch (error) {
    console.error("error loading content:", error);
  }
}

//call backend
//response the json

//selectMealType('breakfast')
