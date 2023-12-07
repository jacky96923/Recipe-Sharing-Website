export async function loadAttributes() {
  try {
    let res = await fetch("/attributes");
    let attributes = await res.json();
    console.log(attributes);
    for (let diet of attributes.diet) {
      document.querySelector(
        "#diet"
      ).innerHTML += ` <input type="checkbox" id=${diet.diet} name=${diet.diet} checked /> <label for=${diet.diet}>${diet.diet}</label>`;
    }
    for (let allergies of attributes.allergies) {
      document.querySelector(
        "#allergies"
      ).innerHTML += ` <input type="checkbox" id=${allergies.allergies} name=${allergies.allergies} checked /> <label for=${allergies.allergies}>${allergies.allergies}</label>`;
    }
    for (let avoid of attributes.avoid) {
      document.querySelector(
        "#avoid"
      ).innerHTML += ` <input type="checkbox" id=${avoid.avoid} name=${avoid.avoid} checked /> <label for=${avoid.avoid}>${avoid.avoid}</label>`;
    }
    for (let cuisine of attributes.cuisine) {
      document.querySelector(
        "#cuisines"
      ).innerHTML += ` <input type="checkbox" id=${cuisine.cuisine} name=${cuisine.cuisine} checked /> <label for=${cuisine.cuisine}>${cuisine.cuisine}</label>`;
    }
  } catch (error) {
    console.error("error loading attributes:", error);
  }
}
