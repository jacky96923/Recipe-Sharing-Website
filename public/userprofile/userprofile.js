async function loadCard() {
  try {
    let res = await fetch("/userprofile/1");
    let profiles = await res.json();

    renderData(profiles);
  } catch (error) {
    console.error("error loading content:", error);
  }
}

function renderData(profiles) {
  let recipe_cardTemplate = document.querySelector("#template");
  let recipe_card = document.querySelector("#recipe_card");
  recipe_card.textContent = " ";
  for (let recipe of profiles.recipes) {
    let node = recipe_cardTemplate.content.cloneNode(true);
    let recipeNameElement = node.querySelector("#recipeName");
    let userNameElement = node.querySelector("#userName");
    let coverImageElement = node.querySelector("#coverImage");
    let imagePath = `/uploads/${recipe.cover_image}`;
    coverImageElement.src = imagePath;

    recipeNameElement.textContent = recipe.recipe_title;

    userNameElement.textContent = recipe.user_name;

    //delete button
    const delete_btn = node.querySelector(".deleteButton");
    recipe_card.appendChild(node);
    delete_btn.addEventListener("click", async () => {
      try {
        let res = await fetch("/recipe/" + recipe.id, {
          method: "DELETE",
        });

        if (res.ok) {
          console.log("Recipe deleted");
          loadCard();
        } else {
          console.error("Failed to delete recipe");
        }
      } catch (error) {
        console.error("error loading content:", error);
      }
    });
  }
}

loadCard();

// delete button
// const delete_btn = document.getElementById("deleteButton");

// delete_btn.addEventListener("click", async () => {
//   try {
//     let res = await fetch("/recipe/1", {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       console.log("Recipe deleted");
//     } else {
//       console.error("Failed to delete recipe");
//     }
//   } catch (error) {
//     console.error("error loading content:", error);
//   }
// });

// Make an HTTP request to retrieve user data
fetch("/userprofile")
  .then((response) => response.json())
  .then((data) => {
    console.log("data:", data);

    if (data.error == "not logged in") {
      location.href = "/login/login.html";
      return;
    }
    // Populate the profile page with user data
    document.getElementById("username").textContent = data.user_name;
    document.getElementById("email").textContent = data.email;
    document.getElementById("profile-picture").src = data.profile_pic;

    // Populate preferences list
    const preferencesList = document.getElementById("preferences");
    for (const preference in data.preferences) {
      const preferenceItem = document.createElement("li");
      preferenceItem.textContent = preference;
      preferencesList.appendChild(preferenceItem);
    }
  })
  .catch((error) => console.error(error));
