import { loadAttributes } from "../loadAttributes.js";

loadAttributes();

document
  .querySelector("#form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Serialize the Form afterwards
    const form = event.target;
    const formObject = new FormData(form);

    const res = await fetch("/submit", {
      method: "POST",
      body: formObject,
    });
    const result = await res.json();

    console.log(result);
  });

// Add click event listener to the "Add Ingredient" button
$("#add_ingredient_button").click(function () {
  // Create a new set of 3 text boxes and text elements
  var ingredientDiv = $("<div></div>");
  var nameInput = $('<input type="text" name="name">');
  var nameLabel = $("<div>Name: </div>");
  var amountInput = $('<input type="text" name="amount">');
  var amountLabel = $("<div>Amount: </div>");
  var unitInput = $('<input type="text" name="unit">');
  var unitLabel = $("<div>Unit: </div>");

  // Create a delete button for the new set of text boxes
  var deleteButton = $(
    '<button class="delete_ingredient_button">Delete</button>'
  );

  // Append the new elements to the container
  ingredientDiv.append(
    nameLabel,
    nameInput,
    amountLabel,
    amountInput,
    unitLabel,
    unitInput,
    deleteButton
  );
  $("#additional_ingredients").append(ingredientDiv);
});

// Add click event listener to the "Delete" buttons (using event delegation)
$("#additional_ingredients").on(
  "click",
  ".delete_ingredient_button",
  function () {
    $(this).parent().remove();
  }
);
