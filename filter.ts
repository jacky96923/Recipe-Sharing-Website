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

filterIngredientRouter.post("/ingredentChoice", async (req, res, next) => {
  try {
    let userId = 1;
    let { ingredient_name } = req.body;
    console.log(ingredient_name);

    await client.query(
      `INSERT INTO recipe_ingredient (ingredient_name) VALUES ($1,$2,$3,$4)`,
      [userId, ingredient_name]
    );
    res.json({});
  } catch (error) {
    next(error);
  }
});

filterIngredientRouter.get("/ingredentExist", async (req, res) => {
  let { ingredient_name } = req.query;
  let result = await client.query(
    `Select
    recipe.id from recipe
    inner join recipe_ingredient 
    on ingredient_name 
    = ingredient_name.recipe_id`,
    [ingredient_name]
  );
  let ingredientChoice = result.rows;
  res.json({ ingredientChoice });
});
