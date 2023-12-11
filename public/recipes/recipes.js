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
  recipeTitleElement.textContent = recipes.recipe_info[0].recipe_title;

  // put cover image if is_cover
  let recipeImageCoverElement = document.querySelector("#recipeCover");
  for (let i = 0; i < recipes.recipe_images.length; i++) {
    if (recipes.recipe_images[i].is_cover) {
      recipeImageCoverElement.src = recipes.recipe_images[i].image;
    }
  }

  let ingredientsCountElement = document.querySelector("#ingredients_count");
  ingredientsCountElement.textContent = recipes.recipe_ingredients.length;

  let cuisineElement = document.querySelector("#cuisine");
  cuisineElement.textContent = recipes.recipe_info[0].cuisine;

  let allergiesTemplate = document.querySelector("#template_2");
  let allergiesContainer = document.querySelector("#allergies_container");
  allergiesContainer.textContent = " ";
  for (allergies of recipes.recipe_allergies) {
    let node = allergiesTemplate.content.cloneNode(true);
    let allergiesElement = node.querySelector("#allergies");

    allergiesElement.textContent = allergies.name;

    allergies_container.appendChild(node);
  }

  let profile_picElement = document.querySelector("#profile_pic");
  profile_picElement.src = recipes.recipe_info[0].profile_pic;

  let userinfoElement = document.querySelector("#user_info");
  userinfoElement.textContent = recipes.recipe_info[0].user_name;

  //ingredients loop
  let ingredientsTemplate = document.querySelector("#template");
  let ingredientsContainer = document.querySelector("#ingredientsContainer");
  ingredientsContainer.textContent = " ";
  for (let ingredients of recipes.recipe_ingredients) {
    let node = ingredientsTemplate.content.cloneNode(true);
    let ingredientsElement = node.querySelector("#ingredients");
    let amountElement = node.querySelector("#amount");
    let unitElement = node.querySelector("#unit");

    ingredientsElement.textContent = ingredients.ingredient_name;
    amountElement.textContent = ingredients.amount;
    unitElement.textContent = ingredients.unit;

    ingredientsContainer.appendChild(node);
  }

  let main_contentElement = document.querySelector("#main_content");
  main_contentElement.textContent = recipes.recipe_info[0].content;

  for (let i = 0; i < recipes.recipe_images.length; i++) {
    if (!recipes.recipe_images[i].is_cover) {
      document.querySelector(
        ".carousel-inner"
      ).innerHTML += ` <div class="carousel-item active" data-bs-interval="2000">
      <img src="${recipes.recipe_images[i].image}" class="d-block w-100">
    </div>`;
    }
  }
}

loadRecipes();

$(".li-modal").on("click", function (e) {
  e.preventDefault();
  $("#theModal")
    .modal("show")
    .find(".modal-content")
    .load($(this).attr("href"));
});
