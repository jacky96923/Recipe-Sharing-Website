import { Router } from "express";

import { client } from "./database";
import { hasLogin } from "./guard";

export let user_profileRouter = Router();

user_profileRouter.get("/userprofile", hasLogin, async (req, res, next) => {
  try {
    let user_id = req.session.user?.id;

    let result = await client.query(
      `select recipe.id, user_name, title as recipe_title from recipe
      join users on recipe.user_id = users.id
      where user_id = $1;`,
      [user_id]
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
      [user_id]
    );
    for (let row of result.rows) {
      let recipe = recipes.find((recipe) => recipe.id == row.recipe_id);
      recipe.cover_image = row.image;
    }

    result = await client.query(
      /* sql */
      `select
        id
      , profile_pic
      , user_name as username
      , email
      from "users"
      where id = $1
      `,
      [user_id]
    );
    let user = result.rows[0];

    result = await client.query(/* sql */ `
  select
    allergies.id
  , allergies.name
  , user_allergies.id as is_selected
  from allergies
  left join user_allergies on allergies.id = user_allergies.allergies_id
  order by allergies.id asc
  `);
    let allergies = result.rows;

    res.json({ recipes, user, allergies });
  } catch (error) {
    console.log(`Cannot get recipe info from postgreSql`, error);
    next(error);
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

user_profileRouter.post(
  "/user_allergies/:id",
  hasLogin,
  async (req, res, next) => {
    try {
      let user_id = req.session.user?.id;
      let allergies_id = req.params.id;
      await client.query(
        /* sql */ `
      insert into user_allergies
      (user_id, allergies_id)
      values
      ($1, $2)
      `,
        [user_id, allergies_id]
      );
      res.json({});
    } catch (error) {
      next(error);
    }
  }
);

user_profileRouter.delete(
  "/user_allergies/:id",
  hasLogin,
  async (req, res, next) => {
    try {
      let user_id = req.session.user?.id;
      let allergies_id = req.params.id;
      await client.query(
        /* sql */ `
      delete from user_allergies
      where user_id = $1 
        and allergies_id = $2
      `,
        [user_id, allergies_id]
      );
      res.json({});
    } catch (error) {
      next(error);
    }
  }
);
