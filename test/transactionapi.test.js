const chai = require('chai');
const expect = chai.expect;

const request = require('supertest');
const app = require("../server");

const transactionModel = require('../app/models/transactionModel');
const categoryModel = require('../app/models/categoryModel');

const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe('Transaction APIs Test', function () {
    var sessionToken;
    var category;
    var testTransaction;
    before(async () => {
        console.log = function () { };
        console.error = function () { };

        await transactionModel.deleteMany();

        let credentials = {
            username: "testuser",
            password: "testpassword"
        };

        const res = await request(app).post('/api/v1/users/login').send(credentials);

        sessionToken = res.body.data.sessionToken;
        console.log("Token Generated", sessionToken);

        category = await categoryModel.findOne();

        testTransaction = {
            name: "Test Transaction",
            amount: 20,
            categoryId: category._id,
            isExpense: true,
            Date: new Date("2025-02-20")
        };
    });

    after(async () => {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    });

    describe("POST /api/v1/transaction/", async () => {
        it("should add a new transaction", async () => {
            const res = await request(app)
                .post("/api/v1/transaction/")
                .set("Authorization", `Bearer ${sessionToken}`)
                .send(testTransaction);

            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal("Transaction created successfully");
        });

        it("should return 401 incase token is not provided in request", async () => {
            const res = await request(app)
                .post("/api/v1/transaction/")
                .send(testTransaction);

            expect(res.status).to.equal(401);
        });
    });
    describe("GET /api/v1/transaction", () => {
        it("should return 200 OK with transaction", async function () {
          const response = await request(app)
          .get("/api/v1/transaction")
          .expect(200)
          .expect("Content-Type", /json/);
    
          const transactions = response.body.data;
          expect(transactions).to.be.an("array");
          expect(transactions).length.greaterThanOrEqual(0);
    
          transactions.forEach((transaction) => {
            expect(transaction.name).to.be.an("string");
            expect(transaction.amount).to.be.an("number");
          });
        });
    });
});