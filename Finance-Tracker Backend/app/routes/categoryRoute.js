const express = require('express');
const categoryRouter = express.Router();
const { auth } = require('../middleware/authenticationHandler');

const {
    createCategory,
    editCategory,
    deleteCategory,
    getCategory,
    getAllCategories
} = require('../services/categoryService');

categoryRouter.route("/").post(auth, createCategory);
categoryRouter.route("/:id").put(auth, editCategory);
categoryRouter.route("/:id").delete(auth, deleteCategory);
categoryRouter.route("/:id").get(getCategory);
categoryRouter.route("/").get(getAllCategories);

module.exports = categoryRouter;