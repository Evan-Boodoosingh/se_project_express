const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  unlikeItem,
  likeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.delete("/:itemId", deleteItem);
router.post("/", createItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
