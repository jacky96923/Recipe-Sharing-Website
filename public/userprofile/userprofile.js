// const delete_btn = document.getElementById('deleteButton')

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
  for (let profile of profiles.user_profiles) {
    let node = recipe_cardTemplate.content.cloneNode(true);
    let recipeNameElement = node.querySelector("#recipeName");
    let userNameElement = node.querySelector("#userName");
    let coverImageElement = node.querySelector("#coverImage");
    for (let i = 0; i < profiles.profile_coverImage.length; i++) {
      let imagePath = `/uploads/${profiles.profile_coverImage[i].image}`;
      coverImageElement.src = imagePath;
    }

    recipeNameElement.textContent = profile.recipe_title;

    userNameElement.textContent = profile.user_name;
    recipe_card.appendChild(node);
  }
}

loadCard();

// delete button

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
