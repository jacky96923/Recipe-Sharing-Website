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
            <a class="nav-link Post_New_Recipes" href="#">Post New Recipes</a>
        </li>
        <li class="nav-item">
            <a class="nav-link Your_Recipes" aria-disabled="true"
            >Your Recipes</a
            >
        </li>
        <li class="nav-item">
            <a class="nav-link Meal Filter" href="/filter/filter.html" aria-disabled="true"
            >Meal Filter</a
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
</nav>
`;

let main = document.querySelector("main");

document.body.appendChild(app);
app.appendChild(main);
main.hidden = false;

// }, 1000);
