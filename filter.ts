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

filterIngredientRouter.post("/ingredientChoice", async (req, res, next) => {
  try {
    let userId = 1;
    let { ingredient_name } = req.body;
    console.log(ingredient_name);

    await client.query(
      `SELECT ingredient_name from recipe_ingredient where VALUES ($1,$2,$3,$4)`,
      [userId, ingredient_name]
    );
    res.json({});
  } catch (error) {
    next(error);
  }
});

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
    from recipe
    inner join recipe_ingredient on recipe_ingredient.recipe_id = recipe.id
    where recipe_ingredient.ingredient_name = $1
       or recipe_ingredient.ingredient_name = $2
       or recipe_ingredient.ingredient_name = $3
       or recipe_ingredient.ingredient_name = $4
    `,
      ingredient_name as string[]
    );
    let ingredientChoices = result.rows;
    res.json({ ingredientChoices });
  }
);
