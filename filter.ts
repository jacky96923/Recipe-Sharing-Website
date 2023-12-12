import { Router } from "express";

import { client } from "./database";

export let filterIngredientRouter = Router();

// filterIngredientRouter.get('/filteringredient', async (req, res)=>{

// let result = await client.query(
//     `Select
//     recipe.id from recipe
//     inner join recipe_ingredient on ingredient_name = ingredient_name.recipe_id
//     `

// );
// let filterIngredientResult = result.rows;
// res.json({filterIngredientResult});
// })

// filterIngredientRouter.post("/ingredientChoice", async (req, res, next) => {
//   try {
//     let userId = 1;
//     let { ingredient_name } = req.body;
//     console.log(ingredient_name);

//     await client.query(
//       `SELECT ingredient_name from recipe_ingredient where VALUES ($1,$2,$3,$4)`,
//       [userId, ingredient_name]
//     );
//     res.json({});
//   } catch (error) {
//     next(error);
//   }
// });

filterIngredientRouter.get(
  "/recipes/search/by-ingredient",
  // "/ingredentExist"
  async (req, res) => {
    let { ingredient_name } = req.query;
    console.log({ ingredient_name });
    let result = await client.query(
      /* sql */ `
    Select
      recipe.id
    , recipe_ingredient.ingredient_name
    , recipe_image.image
    , recipe.title
    from recipe
    inner join recipe_ingredient on recipe_ingredient.recipe_id = recipe.id
    inner join recipe_image on recipe_image.recipe_id = recipe.id
    where is_cover = true
      and (recipe_ingredient.ingredient_name = $1
       or recipe_ingredient.ingredient_name = $2
       or recipe_ingredient.ingredient_name = $3
       or recipe_ingredient.ingredient_name = $4)
    `,
      ingredient_name as string[]
    );

    let ingredientChoices = result.rows;
    res.json({ ingredientChoices });
  }
);

//below is from JACKY Profile TS
// filterIngredientRouter.get("/userprofile/:id", async (req, res, next) => {
//   try {
//     console.log(req.params);
//     let id = req.params.id;
//     if (id.endsWith("html") || id.endsWith("js") || id.endsWith("css")) {
//       next();
//       return;
//     }
//     console.log("id:", id);

//     let result = await client.query(
//       `select recipe.id, user_name, title as recipe_title from recipe
//       join users on recipe.user_id = users.id
//       where user_id = $1;`,
//       [id]
//     );
//     let recipes = result.rows;

//     result = await client.query(
//       /* sql */ `
//      select
//         recipe_id
//       , image
//       from recipe
//       inner join users on recipe.user_id = users.id
//       inner join recipe_image on recipe_image.recipe_id = recipe.id
//       where user_id = $1
//       and is_cover = true`,
//       [id]
//     );
//     for (let row of result.rows) {
//       let recipe = recipes.find((recipe) => recipe.id == row.recipe_id);
//       recipe.cover_image = row.image;
//     }

//     res.json({ recipes });
//   } catch (error) {
//     console.log(`Cannot get recipe info from postgreSql`, error);
//   }
// });
