const chalk = require("chalk")
const cp = require("child_process")

module.exports = async () => {
  try {
    console.log(chalk.cyan("Creating test data base..."))
    cp.spawnSync("npx", ["sequelize", "db:create"], { stdio: "inherit" })
    console.log(chalk.cyan("Migrating test data base..."))
    cp.spawnSync("npx", ["sequelize", "db:migrate"], { stdio: "inherit" })
  } catch (error) {
    console.log(chalk.red(error))
    process.exit(-1)
  }
}
