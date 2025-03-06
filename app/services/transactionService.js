const transactionRepository = require('../database/repositories/transactionRepository');
const expressAsyncHandler = require('express-async-handler')

const createTransaction = expressAsyncHandler(async (req, res) => {
    try {
        const { name, amount, categoryId, isExpense, date } = req.body;
        const result = await transactionRepository.createTransaction(name, amount, categoryId, isExpense, date);

        if (result) {
            res.status(201).json({
                message: "Transaction created successfully",
                transaction: result
            });
        } else {
            res.status(400);
            throw new Error('Transaction creation failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error creating transaction",
            error: err.message
        });
    }
});

const editTransaction = expressAsyncHandler(async (req, res) => {
    try {
        const transactionId = req.params.id;
        const result = await transactionRepository.editTransaction(transactionId, req.body);

        if (result) {
            res.status(200).json({
                message: "Transaction edited successfully",
                transaction: result
            });
        } else {
            res.status(400);
            throw new Error('Transaction editing failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error editing transaction",
            error: err.message
        });
    }
});

const deleteTransaction = expressAsyncHandler(async (req, res) => {
    try {
        const transactionId = req.params.id;
        const result = await transactionRepository.deleteTransaction(transactionId);

        if (result) {
            res.status(200).json({
                message: "Transaction deleted successfully"
            });
        } else {
            res.status(400);
            throw new Error('Transaction deletion failed');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error deleting transaction",
            error: err.message
        });
    }
});

const getTransaction = expressAsyncHandler(async (req, res) => {
    try {
      const transactionId = req.params.id;
      const result = await transactionRepository.getTransaction(transactionId);
  
      if (result) {
        res.status(200).json({
          data: result,
          message: "Sucessfully fetched transaction details.",
        });
      } else {
        res.status(204);
        throw new Error(
          `Not able to find the transaction based on the transaction id: ${transactionId}`
        );
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error fetching transaction details",
        error: err.message,
      });
    }
  });
  
  const getAllTransactions = expressAsyncHandler(async (req, res) => {
    try {
      const result = await transactionRepository.getAllTransactions();
      res.status(200).json({
        data: result,
        message: "Successfully fetched all transactions",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error fetching transactions",
        error: err.message,
      });
    }
  });

module.exports = {
    createTransaction,
    editTransaction,
    deleteTransaction,
    getTransaction,
    getAllTransactions
};