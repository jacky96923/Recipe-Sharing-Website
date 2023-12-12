loadAttributes();

document
  .querySelector("#form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Serialize the Form afterwards
    const form = event.target;
    const formObject = new FormData(form);
    try {
      const res = await fetch("/update", {
        method: "POST",
        body: formObject,
      });
      const result = await res.json();

      if (result.error) {
        alert(result.error);
        return;
      }
      // alert("Success!");
      const modal = document.getElementById("successModal");
      modal.style.display = "block";

      const recipeLink = document.getElementById("recipeLink");
      recipeLink.addEventListener("click", function () {
        // Redirect to the submitted recipe page
        window.top.location.href = "/recipes/recipes.html";
        // Replace "/submitted_recipe" with the actual URL of the submitted recipe page
      });

      const frontPageLink = document.getElementById("frontPageLink");
      frontPageLink.addEventListener("click", function () {
        // Redirect to the front page
        window.top.location.href = "/";
        // Replace "/" with the actual URL of your front page
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });

let ingredientTemplate = ingredient_list.children[0];
ingredientTemplate.remove();

function addIngredient() {
  let node = ingredientTemplate.cloneNode(true);
  for (let input of node.querySelectorAll("input")) {
    input.value = "";
  }
  node.querySelector(".delete_btn").onclick = () => {
    node.remove();
  };

  ingredient_list.appendChild(node);
}
addIngredient();
