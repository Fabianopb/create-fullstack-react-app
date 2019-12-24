const chalk = require("chalk")
const cp = require("child_process")

module.exports = async () => {
  console.log(chalk.cyan("Dropping test data base..."))
  cp.spawnSync("npx", ["sequelize", "db:drop"], { stdio: "inherit" })
}
