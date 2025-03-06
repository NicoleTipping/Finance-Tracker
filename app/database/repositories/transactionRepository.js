const transactionModel = require('../../models/transactionModel');

const createTransaction = async (name, amount, categoryId, isExpense, date) => {
    try {
        const newTransaction = await transactionModel.create({
            name: name,
            amount: amount,
            categoryId: categoryId,
            isExpense: isExpense,
            date: date
        });
        return newTransaction;
    } catch (err) {
        throw new Error(`Error while creating transaction: ${err.message}`);
    }
};

const editTransaction = async (transactionId, newData) => {
    try {
        const transactionObject = await transactionModel.findOne({
            _id: transactionId
        });

        if (!transactionObject) {
            return null;
        }

        transactionObject.name = newData.name;
        transactionObject.amount = newData.amount;
        transactionObject.categoryId = newData.categoryId;
        transactionObject.isExpense = newData.isExpense;
        transactionObject.date = newData.date;

        const updatedTransaction = await transactionObject.save();
        return updatedTransaction;

    } catch (err) {
        throw new Error(`Error while creating transaction: ${err.message}`);
    }
};

const deleteTransaction = async (transactionId) => {
    try {
        const transactionObject = await transactionModel.findById(transactionId);

        if (!transactionObject) {
            return null;
        }

        const updatedTransaction = await transactionObject.save();
        return updatedTransaction;

    } catch (err) {
        throw new Error(`Error while creating transaction: ${err.message}`);
    }
};

const getTransaction = async (transactionId) => {
    try {
      const transactionObject = await transactionModel.findOne({
        _id: transactionId
      });
      return transactionObject;
    } catch (err) {
      throw new Error(`Error while fetching transaction: ${err.message}`);
    }
  };
  
  const getAllTransactions = async () => {
    try {
      const transactions = await transactionModel.find();
      return transactions;
    } catch (err) {
      throw new Error(`Error while fetching transactions: ${err.message}`);
    }
  };
  
  const getTransactionById = async(categoryId) => {
    try {
      const transactionObject = await transactionModel.find({
        categoryId: categoryId
      });
      return transactionObject;
    } catch (err) {
      throw new Error(`Error while fetching transaction by Id: ${err.message}`);
    }
  }

module.exports = {
    createTransaction,
    editTransaction,
    deleteTransaction,
    getTransaction,
    getAllTransactions,
    getTransactionById
};