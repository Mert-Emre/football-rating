import { check } from "express-validator";
import { db } from "../index.js";
import bcrypt from "bcrypt";

export const requireEmail = check("email")
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage("Enter a valid email.")
  .bail()
  .custom(async (email) => {
    const user = await db.collection("users").findOne({ email });
    if (user) {
      throw new Error("Email is in use.");
    }
  });

export const requireUsername = check("username")
  .trim()
  .isAlphanumeric()
  .isLength({ min: 6, max: 24 })
  .withMessage("Username should be between 6 and 24 characters.")
  .bail()
  .custom(async (username) => {
    const user = await db.collection("users").findOne({ username });
    if (user) {
      throw new Error("Username is in use.");
    }
  });

export const requirePassword = check("password")
  .trim()
  .isLength({ min: 8, max: 20 })
  .withMessage("Password should be between 8 and 20 characters.")
  .matches(/^[A-Za-z0-9 .,'!*]+$/)
  .withMessage(
    "Password can contain letters, numbers, and these special characters: ?,'!*@-_"
  );

export const requireUsernameExists = check("username")
  .trim()
  .isAlphanumeric()
  .isLength({ min: 6, max: 24 })
  .withMessage("Invalid username")
  .bail()
  .custom(async (username, { req }) => {
    const user = await db.collection("users").findOne({ username });
    if (!user) {
      throw new Error("Check your email/password.");
    }
    req.user = user;
  });

export const requireValidPassword = check("password")
  .trim()
  .isLength({ min: 8, max: 20 })
  .withMessage("Password should be between 8 and 20 characters.")
  .matches(/^[A-Za-z0-9 .,'!*]+$/)
  .bail()
  .custom(async (password, { req }) => {
    const match = await bcrypt.compare(password, req.user.password);
    req.user = null;
    if (!match) {
      throw new Error("Check your email/password.");
    }
  });
