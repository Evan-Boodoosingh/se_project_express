const router = require("express").Router();

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateAuthentication,
  validateUserBody,
} = require("../middlewares/validation");

const { NotFoundErrorClass } = require("../utils/errors");

// Health check route
router.get("/", (req, res) => {
  res.json({ message: "WTWR API is running", status: "ok" });
});

router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);

router.use("/items", clothingItemsRouter);
router.use("/users", auth, userRouter);

router.use((req, res, next) => {
  next(new NotFoundErrorClass("Request resource not found"));
});

module.exports = router;
