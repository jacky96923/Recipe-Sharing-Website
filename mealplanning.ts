import { Router } from "express";

import { client } from "./database";

export let mealPlanningRouter = Router();

mealPlanningRouter.get("/recipes", async (req, res, next) => {
  try {
    let result = await client.query(/* sql */ `select
    recipe_image.recipe_id
  , recipe_image.image as recipe_image_image
  , recipe.title as recipe_title
  from recipe_image
  inner join recipe on recipe.id = recipe_image.recipe_id`);
    let recipes = result.rows;
    res.json({ recipes });
  } catch (error) {
    next(error);
  }
});

// mealPlanningRouter.get("/recipes:id", (req, res) => {
//   if (req.query.type == /) {
//     res.json({
//       recipes: [
//         {
//           user: "Peter",
//           users_id: 2,
//           title: "星米",
//           cuisine: 2,
//           calories: 200,
//           content: "落鑊起鑊",
//         },

//         {},
//       ],
//     });
//     return;
//   }
//   if (req.query.type == "lunch") {
//     res.json({ recipes: [] });
//     return;
//   }
//   if (req.query.type == "dinner") {
//     res.json({ recipes: [] });
//     return;
//   }

//   res.status(400);
//   res.json({ error: "invalid meal type" });
// });
