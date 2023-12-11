import { Router } from "express";
import { client } from "./database";
import { comparePassword, hashPassword } from "./hash";
import { hasLogin } from "./guard";
const fs = require("fs");

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
      (req.session.user as UserSession) = {
        id: user.id,
        username,
      };
      req.session.save();

      res.json({ user });
      return;
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
      console.log(req.body);
      let username = req.body.username;
      let password = req.body.password;
      let email = req.body.email;
      let file = (req as any).file;
      console.log(file);

      let newImagePath = "";
      if (file) {
        var oldPath = file.path;
        var newPath = "public/profile_img/" + file.filename;
        newImagePath = "/profile_img/" + file.filename;
        fs.rename(oldPath, newPath, function () {
          console.log("Successfully renamed - AKA moved!");
        });
      }
      const password_hash = await hashPassword(password);
      console.log(password, password_hash);
      await client.query(
        `insert into "users" (user_name, email, password, profile_pic, preferences) values ($1, $2,$3,$4, $5)`,
        [
          username,
          email,
          password_hash,
          newImagePath,
          {
            diet: { vegetarian: 1, meat: 1 },
            allergies: { peanut: 1 },
            abc: [1, 2, 3, 4, 5],
            def: 0,
            hij: 1,
          },
        ]
      );
      // if (preferences.diet.vegetarian == 1) ...
      return res.json({ user: username, password: password });
    } catch (error) {
      res.status(500);
      res.json({ error: String(error) });
    }
    return null;
  }
);

userRouter.get("/userprofile", async (req, res, next) => {
  try {
    if (req.session.user) {
      //res.json(req.session.user);
      const user = (req.session as any).user;
      const username = user.username;

      let result = await client.query(
        `select * from "users" where user_name = $1`,
        [username]
      );

      // let user: { password: string }[] = result.rows;
      let dbuser = result.rows[0];
      let preferences = dbuser.preferences;
      if (preferences.abc == 1) {
        console.log("It is 1!!!");
      }
      res.json(dbuser);
    } else {
      res.json({ error: "not logged in" });
    }
    return;
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});

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
