const express = require('express');
const cors = require('cors');

const connectDatabase = require('./app/database/databaseInit');
require("dotenv").config();
const errorHandler = require('./app/middleware/errorHandler');

const userRouter = require('./app/routes/userRoutes');
const transactionRouter = require('./app/routes/transactionRoutes');
const categoryRouter = require('./app/routes/categoryRoute');


const app = express();

app.use(cors());

connectDatabase();

app.use(express.json());
app.use(errorHandler);

var requestBodyParser = require('body-parser');

app.use(requestBodyParser.json({ limit: '5mb' }));
app.use(requestBodyParser.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/category", categoryRouter)
app.get("/PING", (_, res) => {
    res.status(200).json({
        message: "PONG",
    });
});

const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => console.log(`Server is running at port : ${PORT}`));

module.exports = app;