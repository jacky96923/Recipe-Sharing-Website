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

// import { Router } from "express";

// import { client } from "./database";

// export let filterResultRouter = Router();

// filterResultRouter.get("/recipes/favourite", async (req, res) => {
//   let result = await client.query(
//     `Select
//       recipe_image.recipe_id
//     , recipe_image.image
//     , recipe_image.is_cover
//     , recipe.title
//     from recipe_image
//     inner join recipe on recipe.id = recipe_image.recipe_id
//     -- where recipe_id = 1;
//     `
//   );
//   let filterResult = result.rows;
//   res.json({ filterResult });
// });
