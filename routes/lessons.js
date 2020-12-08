const express = require("express");
const router = express.Router();

const lessonHandler = require("./handler/lessons");

router.get("/", lessonHandler.getAll);
router.post("/", lessonHandler.create);
router.put("/:id", lessonHandler.update);
router.get("/:id", lessonHandler.get);
router.delete("/:id", lessonHandler.destroy);

module.exports = router