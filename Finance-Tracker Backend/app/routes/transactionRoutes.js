const express = require('express');
const { auth } = require("../middleware/authenticationHandler");
const transactionRouter = express.Router();

const {
    createTransaction,
    editTransaction,
    deleteTransaction,
    getAllTransactions,
    getTransaction
} = require('../services/transactionService');

transactionRouter.route("/").post(auth, createTransaction);
transactionRouter.route("/:id").put(auth, editTransaction);
transactionRouter.route("/:id").delete(auth, deleteTransaction);
transactionRouter.route("/:id").get(getTransaction);
transactionRouter.route("/").get(auth, getAllTransactions);


module.exports = transactionRouter;