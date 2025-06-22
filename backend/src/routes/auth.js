const express = require("express");
const { check } = require("express-validator");
const { signup, login, getProfile } = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

router.get("/profile", auth, getProfile);

module.exports = router;
