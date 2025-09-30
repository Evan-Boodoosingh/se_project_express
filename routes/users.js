const router = require("express").Router();

router.get("/", () => console.log("GET user"));
router.get("/:userId", () => console.log("GET user by id"));
router.post("/", () => console.log("post user"));

module.exports = router;