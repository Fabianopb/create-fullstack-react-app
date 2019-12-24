const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const usersController = require("./db/controllers/users")
const itemsController = require("./db/controllers/items")

const app = express()

const usersRouter = express.Router()
usersRouter.get("/", usersController.findAll)
usersRouter.post("/", bodyParser.json(), usersController.create)
app.use("/api/users", usersRouter)

const itemsRouter = express.Router()
itemsRouter.get("/", itemsController.findAll)
itemsRouter.post("/", bodyParser.json(), itemsController.create)
app.use("/api/items", itemsRouter)

app.get("/api", (_, res) => {
  res.send("Hello, world!")
})

app.use(express.static(path.resolve("build")))

app.all("*", (_, response) => {
  response.sendFile(path.resolve("build", "index.html"))
})

module.exports = app
