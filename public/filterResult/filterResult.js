// const { default: test } = require("node:test");documentdocument

let selected_recipe_id = null;

async function loadFavouriteRecipes() {
  try {
    let res = await fetch("/filterResult/favourite");
    let json = await res.json();
    console.log({ json });
    if (json.error) {
      throw new Error(json.error);
    }
    let filterResultTemplate = document.querySelector(".recipe");

    for (let recipe of json.filterResult) {
      // show recipe
      let node = filterResultTemplate.cloneNode(true);
      console.log({ node });
      node.querySelector("#title").textContent = recipe.title;
      node.querySelector("img").src = "/upload/" + recipe.image;
      node.onclick = () => {
        // node.style.borderColor = "red";
        document
          .querySelectorAll(".recipe.selected")
          .forEach((node) => node.classList.remove("selected"));
        node.classList.add("selected");
        selected_recipe_id = recipe.recipe_id;
      };
      favourResultList.appendChild(node);
      filterResultTemplate.remove();
    }
  } catch (error) {
    // show error in UI
    console.error("error loading content:", error);
  }
}
loadFavouriteRecipes();

async function selectMealImage() {
  if (!selected_recipe_id) {
    alert("please select a recipe first");
    return;
  }
  let params = new URLSearchParams(location.search);
  let date = params.get("date");
  let mealType = params.get("mealType");
  console.log(mealType, date, selected_recipe_id);
  location.href = "/meal_suggestion/mealPlanning.html?" + ".dateStr" + params;
  let res = await fetch("/selectedmeal", {
    method: "POST",
    body: JSON.stringify({ mealType, date, selected_recipe_id }),
    headers: { "content-type": "application/json" },
  });
  let json = await res.json();
  let selectMealImage = [];
}

insertrecipe();
