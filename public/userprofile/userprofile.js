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
  for (let profile of profiles) {
    let node = recipe_cardTemplate.textContent.cloneNode(true);
    let coverImageElement = node.querySelector("#coverImage");
    let recipeNameElement = node.querySelector("#recipeName");
    let userNameElement = node.querySelector("#userName");

    coverImageElement.src = profile.profile_pic;
    recipeNameElement.textContent = profile.recipe_title;
    if (profile.is_cover) {
      userNameElement.textContent = profile.user_name;
    }

    recipe_card.appendChild(node);
  }
}

loadCard();
// function renderData(data) {
//   const container = document.getElementById("main_content");
//   container.innerHTML = JSON.stringify(data);
// }

// loadCard();

// delete_btn.addEventListener('click', async () => {
//   try {
//     let res = await fetch("/recipe/1", {
//       method: "DELETE"
//     })

//     if(response.ok) {
//       console.log("Recipe deleted")
//     } else {
//       console.error("Failed to delete recipe")
//     }
//   } catch (error) {
//     console.error("error loading content:", error);
//   }

// })
