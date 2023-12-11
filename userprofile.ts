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

    let result1 = await client.query(
      `select recipe.id, user_name, title as recipe_title from recipe
      join users on recipe.user_id = users.id
      where user_id = $1;`,
      [id]
    );

    let result2 = await client.query(
      `select user_id, recipe_id, image, is_cover from recipe
      join users on recipe.user_id = users.id
      join recipe_image on recipe_image.recipe_id = recipe.id
      where recipe_id = $1
      and is_cover = true`,
      [id]
    );
    let user_profiles = result1.rows;
    let profile_coverImage = result2.rows;
    console.log(user_profiles);
    console.log(profile_coverImage);
    res.json({ user_profiles, profile_coverImage });
  } catch (error) {
    console.log(`Cannot get recipe info from postgreSql`, error);
  }
});

user_profileRouter.delete("/recipe/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await client.query("BEGIN");
    await client.query(`DELETE FROM recipe WHERE recipe_id = $1`, [id]);
    await client.query(`DELETE FROM recipe_allergies WHERE recipe_id = $1`, [
      id,
    ]);
    await client.query(`DELETE FROM recipe_image WHERE recipe_id = $1`, [id]);
    await client.query(`DELETE FROM recipe_avoid WHERE recipe_id = $1`, [id]);
    await client.query(`DELETE FROM recipe_ingredient WHERE recipe_id = $1`, [
      id,
    ]);

    await client.query("COMMIT");
    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("recipe deletion failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
