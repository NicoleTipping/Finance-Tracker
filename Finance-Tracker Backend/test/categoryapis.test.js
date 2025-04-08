const chai = require("chai");
const expect = chai.expect;

const request = require("supertest");
const app = require("../server");

const CategoryModel = require("../app/models/categoryModel");

const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe("Category APIs Tests", function () {
  var sessionToken;
  before(async () => {
    console.log = function () { };
    console.error = function () { };

    await CategoryModel.deleteMany();
    let credentials = {
      username: "tUser",
      password: "testpassword",
    };

    const res = await request(app).post("/api/v1/users/").send(credentials);

    sessionToken = res.body.data.sessionToken;
    console.log("Token Generated", sessionToken);
  });

  after(async () => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  const testCategory = {
    name: "testCategory"
  };

  describe("POST /api/v1/category/", async () => {
    it("should add a new category", async () => {
      const res = await request(app)
        .post("/api/v1/category/")
        .set("Authorization", `Bearer ${sessionToken}`)
        .send(testCategory);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal("Category created successfully");
    });

    it("should return 401 incase token is not provided in request", async () => {
      const res = await request(app)
        .post("/api/v1/category/")
        .send(testCategory);

      expect(res.status).to.equal(401);
    });
  });

  describe("GET /api/v1/category", function () {
    it("should return 200 OK with categories", async function () {
      const response = await request(app)
        .get("/api/v1/category")
        .expect(200)
        .expect("Content-Type", /json/);

      const categories = response.body.data;
      expect(categories).to.be.an("array");
      expect(categories).length.greaterThanOrEqual(0);

      categories.forEach((category) => {
        expect(category.name).to.be.an("string");
      });
    });

  });
});
