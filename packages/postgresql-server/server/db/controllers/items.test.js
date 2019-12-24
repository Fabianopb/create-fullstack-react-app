const request = require("supertest")
const app = require("../../app")
const db = require("../models")

afterAll(() => {
  db.sequelize.close()
})

describe("Items endpoints tests", () => {
  it("creates and gets an item", async done => {
    // create a user
    await request(app)
      .post("/api/items")
      .send({ name: "Blue pen" })
    // get the created user
    const response = await request(app).get("/api/items")
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0].name).toBe("Blue pen")
    done()
  })
})
