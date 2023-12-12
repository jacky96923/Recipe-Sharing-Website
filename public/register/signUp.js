async function signUp(event) {
  event.preventDefault();
  let form = event.target;
  let res = await fetch("/signUp", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    }),
  });
  let json = await res.json();
  if (json.error) {
    errorMessage.textContent = json.error;
    return;
  }
  errorMessage.textContent = "signup successfully";
  location.href = "/login.html";
}

async function loadAttributes() {
  try {
    let res = await fetch("/attributes");
    let attributes = await res.json();
    console.log(attributes);

    for (let allergies of attributes.allergies) {
      document.querySelector(
        "#allergyList"
      ).innerHTML += ` <input type="checkbox" data-group="group2" id=${allergies.allergies} name="allergies" value=${allergies.id}  /> <label for=${allergies.allergies}>${allergies.allergies}</label>`;
    }
    for (let avoid of attributes.avoid) {
      document.querySelector(
        "#dislikedItem"
      ).innerHTML += ` <input type="checkbox" data-group="group3" id=${avoid.avoid} name="avoid" value=${avoid.id}  /> <label for=${avoid.avoid}>${avoid.avoid}</label>`;
    }
    for (let cuisine of attributes.cuisine) {
      document.querySelector(
        "#cuisineList"
      ).innerHTML += ` <input type="checkbox" data-group="group4" id=${cuisine.cuisine} name="cuisine" value=${cuisine.id} checked /> <label for=${cuisine.cuisine}>${cuisine.cuisine}</label>`;
    }

    let inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = false;
      }
    }
  } catch (error) {
    console.error("error loading attributes:", error);
  }
}

loadAttributes();

// async function loadOptions() {
//   let res = await fetch("/signup/options");
//   let json = await res.json();

//   let template = allergyList.children[0];
//   allergyList.textContent = "";
//   for (let allergy of json.allergies) {
//     // let option = document.createElement("option");
//     // option.value = allergy.id;
//     // option.textContent = json.name;
//     // allergyList.appendChild(option);

//     let node = template.cloneNode(true);
//     node.querySelector("span").textContent = allergy.name;
//     node.querySelector("input").value = allergy.id;
//     allergyList.appendChild(node);
//   }

//   template = dislikedItem.children[0];
//   dislikedItem.textContent = "";
//   for (let avoid of json.avoid) {
//     // let option = document.createElement("option");
//     // option.value = allergy.id;
//     // option.textContent = json.name;
//     // allergyList.appendChild(option);

//     let node = template.cloneNode(true);
//     node.querySelector("span").textContent = avoid.name;
//     node.querySelector("input").value = avoid.id;
//     dislikedItem.appendChild(node);
//   }

//   template = cuisine.children[0];
//   cuisine.textContent = "";
//   for (let cuisine of json.cuisine) {
//     // let option = document.createElement("option");
//     // option.value = allergy.id;
//     // option.textContent = json.name;
//     // allergyList.appendChild(option);

//     let node = template.cloneNode(true);
//     node.querySelector("span").textContent = cuisine.name;
//     node.querySelector("input").value = cuisine.id;
//     cuisine.appendChild(node);
//   }

//   for (let avoid of json.avoids) {
//   }
// }
// loadOptions();
