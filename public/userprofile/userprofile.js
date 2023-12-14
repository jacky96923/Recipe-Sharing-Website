async function loadProfile() {
  try {
    let res = await fetch("/userprofile", {
      headers: {
        Accept: "application/json",
      },
    });
    let json = await res.json();
    if (json.error) {
      alert(json.error);
      if (res.status == 401) {
        location.href = "/login.html";
      }
      return;
    }

    let profileContainer = document.querySelector("#profile-container");

    document.querySelector("#profile-picture").src =
      "/uploads/" + json.user.profile_pic;

    // document.querySelector("#username").textContent = json.user.username;

    renderData(profileContainer, json.user);

    renderTemplate(allergyList, json);

    let recipe_cardTemplate = document.querySelector("#template");
    let recipe_card = document.querySelector("#recipe_card");
    recipe_card.textContent = " ";
    for (let recipe of json.recipes) {
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
  } catch (error) {
    console.error("error loading content:", error);
  }
}

async function saveAllergy(input) {
  let id = input.value;
  let url = `/user_allergies/${id}`;
  let method = input.checked ? "POST" : "DELETE";
  let json = await callAPI(method, url);
  showSavedMessage(input.parentElement);
}

loadProfile();
