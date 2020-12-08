const express = require('express');
const router = express.Router();

const mentorHandler = require("./handler/mentors");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", mentorHandler.getAll);
router.get("/:id", mentorHandler.get);
router.post("/", verifyToken, mentorHandler.create);
router.put("/:id", verifyToken, mentorHandler.update);
router.delete("/:id", verifyToken, mentorHandler.destroy);

module.exports = router;