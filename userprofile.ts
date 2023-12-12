import { Router } from "express";

import { client } from "./database";

export let user_profileRouter = Router();

user_profileRouter.get("/userprofile/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    if (id.endsWith("html") || id.endsWith("js") || id.endsWith("css")) {
      next();
      return;
    }
    console.log("id:", id);

    let result = await client.query(
      `select recipe.id, user_name, title as recipe_title from recipe
      join users on recipe.user_id = users.id
      where user_id = $1;`,
      [id]
    );
    let recipes = result.rows;

    result = await client.query(
      /* sql */ `
     select
        recipe_id
      , image
      from recipe
      inner join users on recipe.user_id = users.id
      inner join recipe_image on recipe_image.recipe_id = recipe.id
      where user_id = $1
      and is_cover = true`,
      [id]
    );
    for (let row of result.rows) {
      let recipe = recipes.find((recipe) => recipe.id == row.recipe_id);
      recipe.cover_image = row.image;
    }

    res.json({ recipes });
  } catch (error) {
    console.log(`Cannot get recipe info from postgreSql`, error);
  }
});

user_profileRouter.delete("/recipe/:id", async (req, res) => {
  try {
    console.log(req.params);

    let id = req.params.id;
    await client.query("BEGIN");
    await client.query(`DELETE FROM recipe_allergies WHERE recipe_id = $1`, [
      id,
    ]);
    await client.query(`DELETE FROM recipe_image WHERE recipe_id = $1`, [id]);
    await client.query(`DELETE FROM recipe_avoid WHERE recipe_id = $1`, [id]);
    await client.query(`DELETE FROM recipe_ingredient WHERE recipe_id = $1`, [
      id,
    ]);
    await client.query(`DELETE FROM recipe WHERE id = $1`, [id]);

    await client.query("COMMIT");
    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("recipe deletion failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
