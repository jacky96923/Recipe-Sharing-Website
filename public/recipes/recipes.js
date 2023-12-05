async function loadRecipes() {
  try {
    let res = await fetch("/recipe/1");
    let recipes = await res.json();

    renderData(recipes);
  } catch (error) {
    console.error("error loading content:", error);
  }
}

function renderData(recipes) {
  let recipeTitleElement = document.querySelector("#recipe_name");
  recipeTitleElement.textContent = recipes[0].recipe_title;

  let recipeImageElement = document.querySelector("#recipe_image");
  recipeImageElement.textContent = recipes[0].image;

  let ingredientsCountElement = document.querySelector("#ingredients_count");
  ingredientsCountElement.textContent = recipes.length + `   Ingredients`;

  let cuisineElement = document.querySelector("#cuisine");
  cuisineElement.textContent = recipes[0].cuisine;

  let allergiesElement = document.querySelector("#allergies");
  allergiesElement.textContent = recipes[0].allergies;

  let profile_picElement = document.querySelector("#profile_pic");
  profile_picElement.textContent = recipes[0].profile_pic;

  let userinfoElement = document.querySelector("#user_info");
  userinfoElement.textContent = recipes[0].user_name;

  //ingredients loop
  let ingredientsTemplate = document.querySelector("#template");
  let ingredientsContainer = document.querySelector("#ingredientsContainer");
  ingredientsContainer.textContent = " ";
  for (let recipe of recipes) {
    let node = ingredientsTemplate.content.cloneNode(true);
    let ingredientsElement = node.querySelector("#ingredients");
    let amountElement = node.querySelector("#amount");
    let unitElement = node.querySelector("#unit");

    ingredientsElement.textContent = recipe.ingredient_name;
    amountElement.textContent = recipe.amount;
    unitElement.textContent = recipe.unit;

    ingredientsContainer.appendChild(node);
  }

  let main_contentElement = document.querySelector("#main_content");
  main_contentElement.textContent = recipes[0].content;
}

loadRecipes();
