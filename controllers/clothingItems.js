const ClothingItem = require("../models/clothingItem");
const {
  DocumentNotFoundErrorClass,
  NotFoundErrorClass,
  ForbiddenErrorClass,
} = require("../utils/errors");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const owner = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundErrorClass("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenErrorClass("You can only delete your own items");
      }

      return ClothingItem.deleteOne(item).then(() => res.send(item));
    })
    .catch(next);
};

const updateItem = (req, res, next, method) => {
  const {
    params: { itemId },
  } = req;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundErrorClass("Item not found"))
    .then((item) => {
      res.send(item);
    })
    .catch(next);
};

const likeItem = (req, res, next) => {
  updateItem(req, res, next, "$addToSet");
};

const unlikeItem = (req, res, next) => {
  updateItem(req, res, next, "$pull");
};

module.exports = { getItems, createItem, deleteItem, likeItem, unlikeItem };
