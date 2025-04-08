const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    transactionName: {
        type: String,
        required: true
    },
    transactionAmount: {
        type: Number,
        required: true
    },
    isExpense: {
        type: Boolean,
        required: true
    },
    transactionDate: {
        type: Date,
        default: new Date()
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
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