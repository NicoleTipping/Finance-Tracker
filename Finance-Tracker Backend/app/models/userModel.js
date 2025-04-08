const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdTs: {
            type: Date,
            default: new Date()
        },
        updatedTs: {
            type: Date,
            default: new Date()
        }
    }
);

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;