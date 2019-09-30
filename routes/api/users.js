const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route  POST api/users
// @desc   Register User
// @access Public
router.post(
  "/",
  [
    check("name", "Name is requred")
      .not()
      .isEmpty(),
    check("email", "Please provide valid email address").isEmail(),
    check(
      "password",
      "Please enter the password with minimum of 6 or more characters"
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("User route");
  }
);

module.exports = router;
