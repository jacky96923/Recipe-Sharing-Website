async function loadRecipes() {
  try {
    let res = await fetch("/recipe/1");
    let data = await res.json();

    renderData(data);
  } catch (error) {
    console.error("error loading content:", error);
  }
}

function renderData(data) {
  const container = document.getElementById("main_content");
  container.innerHTML = JSON.stringify(data);
}

loadRecipes();
