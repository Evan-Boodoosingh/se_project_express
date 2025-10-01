const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getItems,
  createItem,
  deleteItem,
  unlikeItem,
  likeItem,
} = require("../controllers/clothingItems");

// Public route (no authentication required)
router.get("/", getItems);

// Protected routes (authentication required)
router.post("/", auth, createItem);
router.delete("/:itemId", auth, deleteItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
