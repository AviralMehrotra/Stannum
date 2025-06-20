const express = require("express");
const {
  generateDescription,
} = require("../../controllers/admin/description-controller");
const router = express.Router();

router.route("/generate-description").post(generateDescription);

module.exports = router; 