const router = require("express").Router();

const userRouter = require("./users");

const clothingItemsRouter = require("./clothingItems");

const { DocumentNotFoundError } = require("../utils/errors");

router.use("/items", clothingItemsRouter);

router.use("/users", userRouter);

router.use((req, res) => {
  res.status(DocumentNotFoundError).send({ message: "Request resource not found" });
});

module.exports = router;