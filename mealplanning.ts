import { Router } from "express";

export let mealPlanningRouter = Router();

mealPlanningRouter.get("/recipes", (req, res) => {
  if (req.query.type == "breakfast") {
    res.json({
      recipes: [
        {
          user: "Peter",
          users_id: 2,
          title: "星米",
          cuisine: 2,
          calories: 200,
          content: "落鑊起鑊",
        },

        {},
      ],
    });
    return;
  }
  if (req.query.type == "lunch") {
    res.json({ recipes: [] });
    return;
  }
  if (req.query.type == "dinner") {
    res.json({ recipes: [] });
    return;
  }

  res.status(400);
  res.json({ error: "invalid meal type" });
});
