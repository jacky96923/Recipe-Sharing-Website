import { Router } from "express";
import { client } from "./database";
import formidable from "formidable";
import fs from "fs";
import { randomUUID } from "crypto";
import { optional, object, string, array } from "cast.ts";

export let post_recipeRouter = Router();

//formidable
const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

post_recipeRouter.get("/attributes", async (req, res) => {
  try {
    let result1 = await client.query(`select id, name as Diet from diet;`);
    let result2 = await client.query(
      `select id,name as Allergies FROM allergies;`
    );
    let result3 = await client.query(`select id, name as avoid from avoid;`);
    let result4 = await client.query(
      `select id, name as Cuisine from cuisine;`
    );

    let diet = result1.rows;
    let allergies = result2.rows;
    let avoid = result3.rows;
    let cuisine = result4.rows;

    console.log(diet);
    console.log(allergies);
    console.log(avoid);
    console.log(cuisine);

    res.json({ diet, allergies, avoid, cuisine });
  } catch (error) {
    console.log(`Cannot get recipe attributes from postgreSQL`);
  }
});

post_recipeRouter.post("/submit", (req, res, next) => {
  console.log("uploading");
  let form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    multiples: true,
    //  filter: part => part.mimetype?.startsWith('image/') || false,
    filter(part) {
      return part.mimetype?.startsWith("image/") || false;
    },
    filename(name, ext, part, form) {
      let uuid = randomUUID();
      let extName = part.mimetype?.split("/").pop();
      return `${uuid}.${extName}`;
    },
  });
  form.parse(req, async (err, fields, files) => {
    try {
      console.log({ err, fields, files });

      if (err) {
        throw err;
      }

      let parser = object({
        fields: object({
          recipe_name: string({ nonEmpty: true }),
          diet: optional(string()),
          allergies: optional(array(string(), { maybeSingle: true })),
          avoid: array(string(), { maybeSingle: true }),
          cuisine: string({ nonEmpty: true }),
          calories: string({ nonEmpty: true }),
          name: array(string(), { maybeSingle: true, minLength: 1 }),
          amount: array(string(), { maybeSingle: true, minLength: 1 }),
          unit: array(string(), { maybeSingle: true, minLength: 1 }),
          content_input: string({ nonEmpty: true }),
        }),
      });

      let input = parser.parse({ fields });
      console.log("input:", input);
      // hard coded user_id and recipe_id.
      let user_id = 1;
      // let recipe_id = 1;
      let title = input.fields.recipe_name;
      let cuisine_id = input.fields.cuisine;
      let calories = input.fields.calories;
      let content = input.fields.content_input;
      let diet_id = input.fields.diet;

      let result = await client.query(
        /* sql */ `
        INSERT INTO recipe 
        (user_id, title, cuisine_id, calories, content, diet_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        returning id
        `,
        [user_id, title, cuisine_id, calories, content, diet_id]
      );
      let recipe_id = result.rows[0].id;

      if (input.fields.allergies) {
        for (let i = 0; i < input.fields.allergies.length; i++) {
          let allergies_id = input.fields.allergies[i];
          console.log("insert recipe_allergies", { recipe_id, allergies_id });

          await client.query(
            `INSERT INTO recipe_allergies (recipe_id, allergies_id)
            VALUES ($1, $2)`,
            [recipe_id, allergies_id]
          );
        }
      }

      for (let i = 0; i < input.fields.avoid.length; i++) {
        let avoid_id = input.fields.avoid[i];
        await client.query(
          `INSERT INTO recipe_avoid (recipe_id, avoid_id)
          VALUES ($1, $2)`,
          [recipe_id, avoid_id]
        );
      }

      for (let i = 0; i < input.fields.name.length; i++) {
        let name = input.fields.name[i];
        let amount = input.fields.amount[i];
        let unit = input.fields.unit[i];
        await client.query(
          `INSERT INTO recipe_ingredient (recipe_id, ingredient_name, amount, unit)
                  VALUES ($1, $2, $3, $4)`,
          [recipe_id, name, amount, unit]
        );
      }

      let imageCover;
      if (!Array.isArray(files.cover_image)) {
        imageCover = files.cover_image.newFilename;
        console.log({ imageCover });
      }

      let is_cover = true;

      await client.query(
        `INSERT INTO recipe_image (recipe_id, image, is_cover)
                  VALUES ($1, $2, $3)`,
        [recipe_id, imageCover, is_cover]
      );

      let image;
      if (Array.isArray(files.image1)) {
        for (let i = 0; i < files.image1.length; i++) {
          image = files.image1[i].newFilename;
          let is_cover = false;
          console.log({ image });
          await client.query(
            `INSERT INTO recipe_image (recipe_id, image, is_cover)
            VALUES ($1, $2, $3)`,
            [recipe_id, image, is_cover]
          );
        }
      }

      res.json({ message: "submit success" });
      // res.redirect('/post_recipes/submit_success.html')
    } catch (error) {
      res.json({
        error:
          "Please Fill In the Required Field: " +
          String(error)
            .replace("TypeError: ", "")
            .replace("Invalid non-empty string", "missing"),
      });
    }
  });
});
