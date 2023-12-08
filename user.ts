import { Router } from "express";
import { client } from "./database";
import { comparePassword } from "./hash";
import { hasLogin } from "./guard";

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
    let result = await client.query(
      `select * from "users" where user_name = $1`,
      [username]
    );

    // let user: { password: string }[] = result.rows;
    let user = result.rows[0];
    console.log({ user });
    if (!user) {
      res.status(401);
      res.json("This username is not registered");
      return;
    }

    if (
      await comparePassword({
        password: password,
        password_hash: user[0].password,
      })
    ) {
      (req.session.user as UserSession) = {
        id: user.id,
        username,
      };
      req.session.save();

      res.json({ user });
    } else {
      res.status(400);
      res.json({ error: "wrong username or password" });
      return;
    }

    res.json({ user });
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
