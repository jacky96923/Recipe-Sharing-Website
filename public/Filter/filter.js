import "/userprofile/userprofile.js";

let ingredientChoice_recipe_id = null;

async function loadIngredientChoice() {
  try {
    let res = await fetch("/ingredentExist");
    let json = await res.json();
    console.log({ json });
    if (json.error) {
      throw new Error(json.error);
    }
    let filterIngredientTemplate = document.querySelector(".recipe_ingredient");

    for (let choice of json.ingredientChoice) {
      let node = filterIngredientTemplate.cloneNode(true);
      console.log({ node });
      node.querySelector(".confirmation").textcontent =
        recipe_ingredient.ingredient.name;
      node.onclick = () => {
        document
          .querySelectorAll(".recipe.selected")
          .forEach((node) => node.classList.remove("selected"));
        node.classList.add("selected");
        selected_recipe_id = recipe.recipe_id;
      };
      filterIngredientList.appendChild(node);
      filterIngredientTemplate.remove();
    }
  } catch (error) {
    console.error("error loading content", error);
  }
}
loadIngredientChoice();

async function selectRecipe() {
  let params = new URLSearchParams(result.search);
  let recipe = params.get("recipe");
  console.log(recipe);
  // location.href = "/filter/filter.html?" + params;
  // location.href = "/userprofile/userprofile.html?" + params;
  let res = await fetch("/ingredentChoice", {
    method: "POST",
    body: JSON.stringify({ recipe }),
    headers: { "content-type": "application/json" },
  });
  let json = await res.json();
  let selectRecipe = [];
}

// insertrecipe();
