import { Router } from "express";
import { client } from "./database";
import formidable from "formidable";
import fs from "fs";
import { randomUUID } from "crypto";
import { optional, object, string, array } from "cast.ts";

export let updateRouter = Router();

//formidable
const uploadDir = "uploads";
fs.mkdirSync(uploadDir, { recursive: true });

//loading attributes options
updateRouter.get("/attributes", async (req, res) => {
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

//update the recipe by resubmitting the entire recipe
updateRouter.post("/update", (req, res, next) => {
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
      // let user_id = 1;
      let recipe_id = 45;
      let title = input.fields.recipe_name;
      let cuisine_id = input.fields.cuisine;
      let calories = input.fields.calories;
      let content = input.fields.content_input;
      let diet_id = input.fields.diet;

      await client.query(
        /* sql */ `
          UPDATE recipe
          SET title = $1, cuisine_id = $2, calories = $3, content = $4, diet_id = $5
          WHERE id = $6
          `,
        [title, cuisine_id, calories, content, diet_id, recipe_id]
      );
      // let recipe_id = result.rows[0].id;

      if (input.fields.allergies) {
        for (let i = 0; i < input.fields.allergies.length; i++) {
          let allergies_id = input.fields.allergies[i];
          //   console.log("insert recipe_allergies", { recipe_id, allergies_id });

          await client.query(
            `UPDATE recipe_allergies 
              SET allergies_id = $1
              WHERE recipe_id = $2`,
            [allergies_id, recipe_id]
          );
        }
      }

      for (let i = 0; i < input.fields.avoid.length; i++) {
        let avoid_id = input.fields.avoid[i];
        await client.query(
          `UPDATE recipe_avoid
            SET avoid_id = $1
            WHERE recipe_id = $2
            `,
          [avoid_id, recipe_id]
        );
      }

      for (let i = 0; i < input.fields.name.length; i++) {
        let name = input.fields.name[i];
        let amount = input.fields.amount[i];
        let unit = input.fields.unit[i];
        await client.query(
          `UPDATE recipe_ingredient
            SET ingredient_name = $1, amount = $2, unit = $3
            WHERE recipe_id = $4`,
          [name, amount, unit, recipe_id]
        );
      }

      let imageCover;
      if (!Array.isArray(files.cover_image)) {
        imageCover = files.cover_image.newFilename;
        console.log({ imageCover });
      }

      let is_cover = true;

      await client.query(
        `UPDATE recipe_image
          SET image = $1, is_cover = $2
          WHERE recipe_id = $3`,
        [imageCover, is_cover, recipe_id]
      );

      let image;
      if (Array.isArray(files.image1)) {
        for (let i = 0; i < files.image1.length; i++) {
          image = files.image1[i].newFilename;
          let is_cover = false;
          console.log({ image });
          await client.query(
            `UPDATE recipe_image 
              SET image = $1, is_cover = $2
              WHERE recipe_id = $3`,
            [image, is_cover, recipe_id]
          );
        }
      }

      res.json({ message: "update success" });
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
