import express from "express";
var bodyParser = require("body-parser");
import path from "path";
import dayjs from "dayjs";
import { recipeRouter } from "./recipes";
import { env } from "./env";
import { post_recipeRouter } from "./post_recipes";
import userRouter from "./user";
import { sessionMiddleware } from "./session";

const app = express();

//app.use(express.urlencoded({ extended: true })); //for form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//counter for entering the page // from the file env
app.use(sessionMiddleware);

//for counter // need asking
// declare module "express-session" {
//   interface SessionData {
//     counter: number;
//     user: { id: number };
//   }
// }

// for types of files be ignored by the counter
let mediaExtnameList = [
  ".js",
  ".css",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".svg",
  ".ico",
  ".mp3",
  ".mp4",
];
function isMediaExtname(extname: string): boolean {
  return mediaExtnameList.includes(extname); // returns true when extname matches the list
}
//

//console.log request details need to be before express public // plus implementation of counter
app.use((req, res, next) => {
  let counter = req.session.counter || 0; //counter, the number before the logs
  if (!isMediaExtname(path.extname(req.url))) {
    //for prevent counting .js/.css/.jpg etc.
    counter++;
    req.session.counter = counter;
  }
  let timestamp = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log(`[${timestamp}] #${counter} ${req.method} Request ${req.url}`);
  next();
});

//add user login page
app.use(userRouter);

//add recipe page
app.use(recipeRouter);
app.use(post_recipeRouter);

//page load setting
app.use("/upload", express.static("upload"));
app.use(express.static("public"));

//page port setting
app.listen(env.PORT, () => {
  console.log("http://localhost:" + env.PORT);
});
