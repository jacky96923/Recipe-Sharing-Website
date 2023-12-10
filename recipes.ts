import { Router } from "express";

import { client } from "./database";

export let recipeRouter = Router();

recipeRouter.get("/recipe/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await client.query(
      `select distinct recipe.id, user_name, title as recipe_title, calories, content, diet.name as diet, cuisine.name as cuisine, image, is_cover, ingredient_name, amount, unit, profile_pic from recipe
      join users on recipe.user_id = users.id
      join diet on recipe.diet_id = diet.id
      join cuisine on recipe.cuisine_id = cuisine.id
      join recipe_image on recipe_image.recipe_id = recipe.id
          join recipe_ingredient on recipe.id = recipe_ingredient.recipe_id
          join recipe_allergies on recipe_allergies.recipe_id = recipe.id
          where recipe.id = $1`,
      [id]
    );
    let recipes = result.rows;
    console.log(recipes);

    res.json(recipes);
  } catch (error) {
    console.log(`Cannot get recipes from postgreSQL`);
  }
});

// select recipe.id, user_name, title as recipe_title, calories, content, cuisine.name as cuisine, image, ingredient_name, amount, unit, profile_pic from recipe join cuisine on recipe.cuisine_id = cuisine.id
//         join recipe_image on recipe_image.recipe_id = recipe.id
//         join recipe_ingredient on recipe.id= recipe_ingredient.recipe_id
//         join recipe_allergies on recipe_allergies.recipe_id  = recipe.id
//         join users on recipe.user_id = users.id
//         where recipe.id = $1`
