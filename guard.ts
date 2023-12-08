import express from "express";

// import { HttpError } from "./http-error";
import "./session";
import { HttpError } from "./error";

export function hasLogin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.session.user) {
    next();
    return;
  }
  res.status(400);
  let accept = req.headers.accept;
  console.log(404, { accept: req.url });
  if (accept?.includes("json") && !accept.includes("html")) {
    res.json({ error: "This API is only for user, not for guest" });
    return;
  }
  res.redirect("/loginPage.html");
}

export function getSessionUser(req: express.Request) {
  if (req.session.user) {
    return req.session.user;
  }
  throw new HttpError(401, "This API is not available to guest");
}
