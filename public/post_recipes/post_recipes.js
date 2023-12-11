// import { loadAttributes } from "../loadAttributes.js";

loadAttributes();

document
  .querySelector("#form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Serialize the Form afterwards
    const form = event.target;
    const formObject = new FormData(form);
    try {
      const res = await fetch("/submit", {
        method: "POST",
        body: formObject,
      });
      const result = await res.json();

      console.log(result);
      console.log(allergies_id);
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
