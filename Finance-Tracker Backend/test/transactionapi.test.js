const chai = require('chai');
const expect = chai.expect;

const request = require('supertest');
const app = require("../server");

const transactionModel = require('../app/models/transactionModel');
const categoryModel = require('../app/models/categoryModel');
const userModel = require('../app/models/userModel');


const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe('Transaction APIs Test', function () {
    var sessionToken;
    var category;
    var testTransaction;
    var user;
    before(async () => {
        // console.log = function () { };
        // console.error = function () { };

        await transactionModel.deleteMany();

        let credentials = {
            username: "tUser",
            password: "testpassword"
        };

        const res = await request(app).post('/api/v1/users/').send(credentials);

        sessionToken = res.body.data.sessionToken;
        console.log("Token Generated", sessionToken);

        category = await categoryModel.findOne();

        user = await userModel.findOne();
        
    });
    
    after(async () => {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    });

    describe("POST /api/v1/transaction/", async () => {
        console.log("Test transaction:", testTransaction);
        it("should add a new transaction", async () => {
            testTransaction = {
                transactionName: "Test Transaction",
                transactionAmount: 20,
                isExpense: true,
                transactionDate: new Date("02-20-2025"),
                categoryId: category._id,
                user: user._id
            };
            
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
    describe("GET /api/v1/transaction", async () => {
        it("should return 200 OK with transaction", async () => {
          const response = await request(app)
          .get("/api/v1/transaction")
          .set("Authorization", `Bearer ${sessionToken}`)
          .expect(200)
          .expect("Content-Type", /json/);

          console.log("Response body:", response.body);

    
          const transactions = response.body;
          expect(transactions).to.be.an("array");
          expect(transactions).length.greaterThanOrEqual(0);
    
          transactions.forEach((transaction) => {
            expect(transaction.transactionName).to.be.an("string");
            expect(transaction.transactionAmount).to.be.an("number");
          });
        });
    });
});