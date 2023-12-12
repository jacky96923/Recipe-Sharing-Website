async function loadRecipes() {
  try {
    let res = await fetch("/recipe/31");
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
      recipeImageCoverElement.src = `/uploads/${recipes.recipe_images[i].image}`;
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
  profile_picElement.src = `/uploads/${recipes.recipe_info[0].profile_pic}`;

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
      <img src="/uploads/${recipes.recipe_images[i].image}" class="d-block w-100">
    </div>`;
    }
  }
}

loadRecipes();

//load iframe to modal
let iframe = document.getElementById("modalIframe");
let modal = document.getElementById("myModal");

modal.addEventListener("show.bs.modal", function () {
  iframe.src = "http://localhost:8200/post_recipes/post_recipes.html";
});

modal.addEventListener("hide.bs.modal", function () {
  iframe.src = "";
});

let iframeWindow = iframe.contentWindow;
let form = iframeWindow.document.getElementById("form");

let submitButton = iframeWindow.document.getElementById("submit_button");
let clearAllButton = iframeWindow.document.getElementById("clear_all_button");

submitButton.addEventListener("click", function () {
  form.submit();
});

clearAllButton.addEventListener("click", function () {
  form.reset();
});
