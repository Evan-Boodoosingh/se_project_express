const ClothingItem = require("../models/clothingItem");
const {
  DocumentNotFoundError,
  ValidationError,
  InternalServerError,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const owner = req.user._id;
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(ValidationError).send({ message: err.message });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = DocumentNotFoundError;
      throw error;
    })
    .then((item) => ClothingItem.deleteOne(item).then(() => res.send(item)))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === DocumentNotFoundError) {
        res.status(DocumentNotFoundError).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(ValidationError).send({ message: "Invalid item ID" });
      } else {
        res.status(InternalServerError).send({ message: err.message });
      }
    });
};

const updateItem = (req, res, method) => {
  const {
    params: { itemId },
  } = req;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = DocumentNotFoundError;
      throw error;
    })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.statusCode === "DocumentNotFoundError") {
        res.status(DocumentNotFoundError).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(ValidationError).send({ message: "Invalid item ID" });
      } else {
        res.status(InternalServerError).send({ message: err.message });
      }
    });
};

const likeItem = (req, res) => {
  updateItem(req, res, "$addToSet");
};

const unlikeItem = (req, res) => {
  updateItem(req, res, "$pull");
};

module.exports = { getItems, createItem, deleteItem, likeItem, unlikeItem };
