import { Router } from "express";

import { client } from "./database";

export let filterResultRouter = Router();

filterResultRouter.get("/filterResult/favourite", async (req, res) => {
  let result = await client.query(
    `Select
      recipe_image.recipe_id
    , recipe_image.image
    , recipe_image.is_cover
    , recipe.title
    from recipe_image
    inner join recipe on recipe.id = recipe_image.recipe_id
    -- where recipe_id = 1;
    `
  );
  let filterResult = result.rows;
  res.json({ filterResult });
});

//要開個File出返在mealplannig
filterResultRouter.post("/selectedmeal", async (req, res, next) => {
  try {
    let userId = 1;
    let { mealType, date, selected_recipe_id } = req.body;
    console.log(mealType, date, selected_recipe_id);

    await client.query(
      `INSERT INTO meal_schedule (user_id,date,recipe_id,period) VALUES ($1,$2,$3,$4)`,
      [userId, date, selected_recipe_id, mealType]
    );
    res.json({});
  } catch (error) {
    next(error);
  }
});

filterResultRouter.get("/selectionResult/selection", async (req, res) => {
  let { date } = req.query;
  let result = await client.query(
    ` select * from meal_schedule join recipe_image on meal_schedule.recipe_id=recipe_image.recipe_id where date=$1
    `,
    [date]
  );
  let selectionResult = result.rows;
  res.json({ selectionResult });
});
