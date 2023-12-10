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

  // put cover image if is_cover
  let recipeImageCoverElement = document.querySelector("#recipeCover");
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].is_cover) {
      recipeImageCoverElement.src = recipes[i].image;
    }
  }

  let ingredientsCountElement = document.querySelector("#ingredients_count");
  ingredientsCountElement.textContent = recipes.length;

  let cuisineElement = document.querySelector("#cuisine");
  cuisineElement.textContent = recipes[0].cuisine;

  let allergiesElement = document.querySelector("#allergies");
  allergiesElement.textContent = recipes[0].allergies;

  let profile_picElement = document.querySelector("#profile_pic");
  profile_picElement.src = recipes[0].profile_pic;

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

  for (let i = 0; i < recipes.length; i++) {
    if (!recipes[i].is_cover) {
      document.querySelector(
        ".carousel-inner"
      ).innerHTML += ` <div class="carousel-item active" data-bs-interval="2000">
      <img src="${recipes[i].image}" class="d-block w-100">
    </div>`;
    }
  }
}

loadRecipes();

const popupLink = document.getElementById("nav-link Post_New_Recipes");
const popupContainer = document.getElementById("popup-container");

popupLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior
  popupContainer.style.display = "block"; // Show the pop-up container
});

const popupContent = document.getElementById("popup-content");

// Function to load the content from popup-content.html
function loadPopupContent() {
  fetch("post_recipes.html")
    .then((response) => response.text())
    .then((data) => {
      popupContent.innerHTML = data; // Inject the HTML content into the pop-up container
    });
}

loadPopupContent();
