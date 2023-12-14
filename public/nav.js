// setTimeout(() => {

let app = document.createElement("div");
app.id = "app";
app.className = "d-flex";
app.innerHTML = /* html */ `
<nav>
    <ul class="nav flex-column">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
                <img
                    src="https://as1.ftcdn.net/v2/jpg/04/41/73/28/1000_F_441732816_Eo3fHdX3oImKtXdkYkktCrR1mbwAT9I6.jpg"
                    style="width: 10rem; height: 10rem"
                >
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link Login" href="/login/login.html">Login/sign-up</a>
        </li>
        <li class="nav-item">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Post New Recipes</button>
        </li>
        <li class="nav-item">
        <a class="nav-link Your Recipes" href="/userprofile/userprofile.html">Your Recipes</a
            >
        </li>
        <li class="nav-item">
            <a class="nav-link Meal Filter" href="/filter/filter.html" aria-disabled="true"
            >Recipe Explorer</a
            >
        </li>
        <li class="nav-item">
            <a class="nav-link Meal_Suggestions" href="/meal_suggestion/mealPlanning.html" aria-disabled="true"
            >Meal Planning</a
            >
        </li>
        <li class="nav-item">
            <a class="nav-link I'm_feeling_Lucky" aria-disabled="true"
            >Get Meal Plan!</a
            >
        </li>
    </ul>

                <!-- Modal -->
<div id="myModal" class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
<div class="modal-dialog modal-lg">
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="staticBackdropLabel">Submitting Recipe !</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-content">
      <iframe id="modalIframe" src="" width="790" height="1100" frameborder="0"></iframe>
    </div>
    <div class="modal-footer">
      <!-- <button type="button" class="btn btn-secondary">Clear All</button>
      <button type="button" class="btn btn-primary">Submit!</button> -->
    </div>
  </div>
</div>
</div>
</nav>
`;

let main = document.querySelector("main");
main.style.flexGrow = 1;

document.body.appendChild(app);
app.appendChild(main);
main.hidden = false;

//load iframe to modal
let iframe = document.getElementById("modalIframe");
let modal = document.getElementById("myModal");

modal.addEventListener("show.bs.modal", function () {
  iframe.src = "http://localhost:8200/post_recipes/post_recipes.html";
});

modal.addEventListener("hide.bs.modal", function () {
  iframe.src = "";
});
