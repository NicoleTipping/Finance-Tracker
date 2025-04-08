const transactionModel = require('../../models/transactionModel');
const { Types } = require("mongoose");

const createTransaction = async (transactionName, transactionAmount, isExpense, transactionDate, categoryId, userId) => {
  try {
    const newTransaction = await transactionModel.create({
      transactionName: transactionName,
      transactionAmount: transactionAmount,
      isExpense: isExpense,
      transactionDate: transactionDate,
      categoryId: categoryId,
      user: new Types.ObjectId(userId)
    });
    return newTransaction;
  } catch (err) {
    throw new Error(`Error while creating transaction: ${err.message}`);
  }
};

const editTransaction = async (transactionId, newData) => {
  try {
    if (!Types.ObjectId.isValid(transactionId)) {
      throw new Error('Invalid transaction ID');
    }

    const transactionObject = await transactionModel.findOne({
      _id: transactionId
    });

    if (!transactionObject) {
      return null;  
    }

    transactionObject.transactionName = newData.transactionName;
    transactionObject.transactionAmount = newData.transactionAmount;
    transactionObject.isExpense = newData.isExpense;
    transactionObject.transactionDate = newData.transactionDate;
    transactionObject.categoryId = newData.categoryId;

    const updatedTransaction = await transactionObject.save();
    return updatedTransaction;

  } catch (err) {
    console.error("Detailed error: ", err);
    throw new Error(`Error while updating transaction: ${err.message}`);
  }
};

const deleteTransaction = async (transactionId) => {
  try {
    const result = await transactionModel.deleteOne({ _id: transactionId });

    if (result.deletedCount === 0) {
      return null;
    }
    return { message: "Transaction deleted successfully" };

  } catch (err) {
    throw new Error(`Error while deleting transaction: ${err.message}`);
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

const getAllTransactions = async (userId) => {
  try {
    const transactions = await transactionModel
      .find({ user: userId })
      .sort({ transactionDate: -1 });
    return transactions;
  } catch (err) {
    throw new Error(`Error while fetching transactions: ${err.message}`);
  }
};

const getTransactionById = async (categoryId) => {
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