const mongoose = require('mongoose');
require("dotenv").config();

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Database is connected! Using ${connection.connection.host} as host and ${connection.connection.port} as port`);
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDatabase;