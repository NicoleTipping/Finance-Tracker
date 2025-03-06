const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isExpense: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    createdTs: {
        type: Date,
        default: new Date()
    },
    updatedTs: {
        type: Date,
        default: new Date()
    }
});

const TransactionSchema = mongoose.model('Transactions', transactionSchema);

module.exports = TransactionSchema;