import { Router } from "express";

import { client } from "./database";

export let user_profileRouter = Router();

user_profileRouter.get("/userprofile/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await client.query(
      `select distinct recipe.id, user_name, title as recipe_title, image, is_cover from recipe
      join users on recipe.user_id = users.id
      join recipe_image on recipe_image.recipe_id = recipe.id
      where recipe.id = $1;`,
      [id]
    );
    let user_profiles = result.rows;
    console.log(user_profiles);
    res.json(user_profiles);
  } catch (error) {
    console.log(`Cannot get recipe info from postgreSql`);
  }
});

// user_profileRouter.delete("/recipe/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     await client.query("BEGIN");
//     await client.query(`DELETE FROM recipe WHERE recipe_id = $1`, [id]);
//     await client.query(`DELETE FROM recipe_allergies WHERE recipe_id = $1`, [
//       id,
//     ]);
//     await client.query(`DELETE FROM recipe_image WHERE recipe_id = $1`, [id]);
//     await client.query(`DELETE FROM recipe_avoid WHERE recipe_id = $1`, [id]);
//     await client.query(`DELETE FROM recipe_ingredient WHERE recipe_id = $1`, [
//       id,
//     ]);

//     await client.query("COMMIT");
//     res.status(200).json({ message: "Recipe deleted" });
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.log("recipe deletion failed:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
