const router = require("express").Router();

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const { DocumentNotFoundError } = require("../utils/errors");

// Public routes (no authentication required)
router.post("/signin", login);
router.post("/signup", createUser);

// Items and users routes (some protected, handled in their respective routers)
router.use("/items", clothingItemsRouter);
router.use("/users", auth, userRouter); // All user routes need auth

router.use((req, res) => {
  res
    .status(DocumentNotFoundError)
    .send({ message: "Request resource not found" });
});

module.exports = router;
