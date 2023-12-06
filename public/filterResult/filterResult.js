// const socket = io.connect();

// const { fstat } = require("fs");

// let loadFilter;
// async function loadFilterResults() {
//   let res = await fetch("/results");
//   let json = await res.json();
//   results.textContent = json.results;
// }
// loadFilterResults();
// window.addEventListener('mouseover', loadFilterResults)
//  window.addEventListener('visibilitychange', loadFilterResults)
// setInterval(loadCounter, 1000)
//   async function inc() {
//     let res = await fetch('/counter/inc', {
//       method: 'POST',
//     })

// recipeList.appendChild(recipeTemplate.cloneNode(true));
// recipeList.appendChild(recipeTemplate.cloneNode(true));
// recipeList.appendChild(recipeTemplate.cloneNode(true));
// recipeList.appendChild(recipeTemplate.cloneNode(true));

async function loadFavouriteRecipes() {
  try {
    let res = await fetch("/filterResult/favourite");
    let json = await res.json();
    console.log({ json });
    if (json.error) {
      throw new Error(json.error);
    }
    let filterResultTemplate = document.querySelector(".recipe");

    for (let recipe of json.filterResult) {
      // show recipe
      let node = filterResultTemplate.cloneNode(true);
      console.log({ node });
      node.querySelector("#title").textContent = recipe.title;
      node.querySelector("img").src = "/upload/" + recipe.image;
      node.onclick = () => {};
      favourResultList.appendChild(node);
      filterResultTemplate.remove();
    }
  } catch (error) {
    // show error in UI
    console.error("error loading content:", error);
  }
}
loadFavouriteRecipes();

// let recipeTemplate = recipeList.children[0];
// recipeTemplate.remove();

// // recipeList.appendChild(recipeTemplate.cloneNode(true));
// // recipeList.appendChild(recipeTemplate.cloneNode(true));
// // recipeList.appendChild(recipeTemplate.cloneNode(true));
// // recipeList.appendChild(recipeTemplate.cloneNode(true));

// async function loadFavouriteRecipes() {
//   try {
//     let res = await fetch("/filterresult/favourite");
//     let json = await res.json();

//     if (json.error) {
//       throw new Error(json.error);
//     }

//     for (let recipe of json.filterresult) {
//       // show recipe
//       let node = recipeTemplate.cloneNode(true);
//       node.querySelector("figcaption").textContent = recipe.title;
//       node.querySelector("img").src = "/upload/" + filterresult.image;
//       node.onclick = () => {};
//       recipeList.appendChild(node);
//     }
//   } catch (error) {
//     // show error in UI
//     console.error("error loading content:", error);
//   }
// }
// loadFavouriteRecipes();
