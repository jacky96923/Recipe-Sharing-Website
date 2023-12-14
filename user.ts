import { Router } from "express";
import { client } from "./database";
import { comparePassword, hashPassword } from "./hash";
import { hasLogin } from "./guard";
import { array, id, object, optional } from "cast.ts";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

type UserSession = {
  id: number;
  username: string;
};

let userRouter = Router();

userRouter.post("/loginToAccount", async (req, res, next) => {
  //action name "login" would crash to the id
  try {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    let result = await client.query(
      `select * from "users" where user_name = $1`,
      [username]
    );

    // let user: { password: string }[] = result.rows;
    let user = result.rows[0];
    console.log({ user });
    if (!user) {
      res.status(401);
      res.json({ error: "This username is not registered" });
      return;
    }
    if (
      await comparePassword({
        password: password,
        password_hash: user.password,
      })
    ) {
      req.session.user = {
        id: user.id,
        username,
      };
      req.session.save();

      res.json({});
      // return;
      // return res.redirect("/");
    } else {
      res.status(400);
      res.json({ error: "wrong username or password" });
      return;
    }
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

userRouter.post(
  "/signUp",
  upload.single("profilePicture"),
  async (req, res, next) => {
    try {
      console.log("signUp req.body:", req.body);

      let parser = object({
        body: object({
          allergies: optional(array(id(), { maybeSingle: true })),
        }),
      });
      let input = parser.parse(req);
      console.log("signup input:", input);

      let username = req.body.username;
      let password = req.body.password;
      let email = req.body.email;
      let avoid = req.body.avoid;
      let cuisine = req.body.cuisine;
      let file = (req as any).file;
      // let peanut = req.body.checkbox.value;
      // let Dairy = req.body.checkbox.value;
      // let SeaFood = req.body.checkbox.value;
      // let Gluten = req.body.checkbox.value;

      let filename = file?.filename;
      const password_hash = await hashPassword(password);
      console.log(password, password_hash);
      let result = await client.query(
        `insert into "users" 
         (user_name, email, password, profile_pic) 
        values
         ($1,$2,$3,$4)
        returning id`,

        [username, email, password_hash, filename]
      );
      let user_id = result.rows[0].id;
      console.log("user_id", user_id);

      for (let allergy_id of input.body.allergies || []) {
        await client.query(
          `insert into "user_allergies"
               (user_id, allergies_id)
              values
               ($1,$2)
            `,
          [user_id, allergy_id]
        );
      }

      if (!avoid) {
        avoid = [];
      }
      if (!Array.isArray(avoid)) {
        avoid = [avoid];
      }
      for (let avoid_id of avoid) {
        await client.query(
          `insert into "user_avoid"
               (user_id, avoid_id)
              values
               ($1,$2)
            `,
          [user_id, avoid_id]
        );
      }

      if (!cuisine) {
        cuisine = [];
      }
      if (!Array.isArray(cuisine)) {
        cuisine = [cuisine];
      }
      for (let cuisine_id of cuisine) {
        await client.query(
          `insert into "user_cuisine"
               (user_id, cuisine_id)
              values
               ($1,$2)
            `,
          [user_id, cuisine_id]
        );
      }

      // console.log("user_input", user_allergies);

      // result = await client.query(
      //   `insert into "allergies"
      //    (Peanut, Dairy, SeaFood, Gluten)
      //   values
      //    ($1,$2,$3,$4)
      //   returning id`,

      //   [Peanut, Dairy, SeaFood, Gluten]
      // );

      // await client.query(
      //   `insert into "users" (user_name, email, password, profile_pic, preferences) values ($1,$2,$3,$4,$5)`,
      //   [
      //     username,
      //     email,
      //     password_hash,
      //     newImagePath,
      //     {
      //       diet: {
      //         Vegetarian: 1,
      //         Meat_Lover: 1,
      //         Pescetarian: 1,
      //         Ketogenic: 1,
      //       },
      //       allergies: { Peanut: 1, Dairy: 1, SeaFood: 1, Gluten: 1 },
      //       Disliked_items: {
      //         Alcohol: 1,
      //         Pork: 1,
      //         Beef: 1,
      //         SeaFood: 1,
      //         Potatoes: 1,
      //       },
      //       Cuisines: { Chinese: 1, North_America: 1, Thai: 1, Vietnamese: 1 },
      //       Desired_Calories: { 100_999: 1, 1000_1999: 1, 2000_2999: 1 },
      //     },
      //   ]
      // );

      // if (preferences.diet.vegetarian == 1) ...
      // return res.json({ user: username, password: password });

      req.session.user = {
        id: user_id,
        username,
      };

      return res.redirect("/");
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
    return null;
  }
);

userRouter.get("/userId", hasLogin, async (req, res, next) => {
  try {
    let result = await client.query(
      `
          select id, name
          where id = $1
      `,
      [(req.session.user as UserSession)?.id]
    );
    let user = result.rows[0];
    //
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/signup/options", async (req, res, next) => {
  try {
    let result = await client.query(
      `
    select
      allergies.name 
    , allergies.id
    from allergies
      `,
      []
    );
    let allergies = result.rows;

    result = await client.query(
      `
    select
      avoid.id 
    , avoid.name 
    from avoid
      `,
      []
    );
    let avoids = result.rows;

    result = await client.query(
      `
    select
      cuisine.id 
    , cuisine.name 
    from cuisine
      `,
      []
    );
    let cuisine = result.rows;

    res.json({
      allergies,
      avoids,
      cuisine,
    });
  } catch (error) {
    next(error);
  }
});

export default userRouter;

// import { Router } from "express";

// let userRouter = Router();

// userRouter.post("/loginToAccount", async (req, res, next) => {
//   try {
//     let username = req.body.username;
//     let password = req.body.password;
//     let result = await client.query(
//       `select id, name,password_hash from "user" where name = $1`,
//       [username]
//     );

//     let user = result.rows[0];
//     console.log({ user });
//     if (!user) {
//       res.status(401);
//       res.end("This username is not registered");
//       return;
//     }
//     res.json({ user });
//   } catch (error) {
//     res.status(500);
//     res.json({ error: String(error) });
//   }
// });

// export default userRouter;
