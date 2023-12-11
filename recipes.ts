import { Router } from "express";

import { client } from "./database";

export let recipeRouter = Router();

recipeRouter.get("/recipe/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let result1 = await client.query(
      `SELECT recipe.id, user_name, title AS recipe_title, calories, content, diet.name AS diet, cuisine.name AS cuisine, profile_pic
      FROM recipe
      JOIN users ON recipe.user_id = users.id
      JOIN diet ON recipe.diet_id = diet.id
      JOIN cuisine ON recipe.cuisine_id = cuisine.id
      WHERE recipe.id = $1;`,
      [id]
    );
    let result2 = await client.query(
      `select recipe_id, image, is_cover from recipe
		    join recipe_image on recipe_image.recipe_id = recipe.id
        where recipe.id = $1`,
      [id]
    );
    let result3 = await client.query(
      `select recipe_id, ingredient_name, amount, unit from recipe
      join recipe_ingredient on recipe.id = recipe_ingredient.recipe_id
      where recipe.id = $1`,
      [id]
    );
    let result4 = await client.query(
      `select recipe_id, allergies.name from recipe
      join recipe_allergies on recipe.id = recipe_allergies.recipe_id
      join allergies on allergies.id = recipe_allergies.allergies_id
      where recipe.id = $1`,
      [id]
    );

    let recipe_info = result1.rows;
    let recipe_images = result2.rows;
    let recipe_ingredients = result3.rows;
    let recipe_allergies = result4.rows;

    console.log(recipe_info);
    console.log(recipe_images);
    console.log(recipe_ingredients);
    console.log(recipe_allergies);

    res.json({
      recipe_info,
      recipe_images,
      recipe_ingredients,
      recipe_allergies,
    });
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
