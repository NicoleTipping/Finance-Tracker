const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
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

const CategorySchema = mongoose.model('Categories', categorySchema);

module.exports = CategorySchema;