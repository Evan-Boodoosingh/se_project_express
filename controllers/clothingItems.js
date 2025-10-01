const ClothingItem = require("../models/clothingItem");
const {
  DocumentNotFoundError,
  ValidationError,
  ForbiddenError,
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
  const { name, weather, imageUrl } = req.body;

  // Accept both imageURL and imageUrl field names
  // const finalImageURL = imageURL || imageUrl;
  // const usedImageUrlField = imageURL ? "imageURL" : "imageUrl";

  // Debug: log what we're trying to create
  // console.log("Creating item with:", {
  //   name,
  //   weather,
  //   imageURL: finalImageURL,
  //   owner,
  // });

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      // Convert response to match the field name that was sent

      res.status(201).send(item);
    })
    .catch((err) => {
      console.error("Full error:", err);
      if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((error) => error.message);
        console.log("Validation errors:", errors);
        return res.status(ValidationError).send({
          message: `Validation failed: ${errors.join(", ")}`,
        });
      }
      return res.status(InternalServerError).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = DocumentNotFoundError;
      throw error;
    })
    .then((item) => {
      // Check if the current user is the owner of the item
      if (item.owner.toString() !== userId) {
        return res.status(ForbiddenError).send({
          message: "You can only delete your own items",
        });
      }

      return ClothingItem.deleteOne(item).then(() => res.send(item));
    })
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
      if (err.statusCode === DocumentNotFoundError) {
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
