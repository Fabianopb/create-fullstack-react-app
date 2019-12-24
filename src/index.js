#!/usr/bin/env node
const chalk = require('chalk');
const cp = require('child_process');
const fs = require('fs-extra');
const path = require('path');

function useYarn() {
  try {
    cp.execSync('yarnpkg --version', { stdio: 'ignore' });
    console.log(chalk.cyan('Yarn found! You\'re good to go!'));
  } catch (e) {
    console.log(chalk.red('Yarn not found. Please go to https://yarnpkg.com/ install yarn and try again.'));
    process.exit(1);
  }
}

function checkProjectName() {
  const projectName = process.argv[2];
  if (!projectName) {
    console.log(chalk.red('Project name has to be specified. Try for example:'));
    console.log(`  ${chalk.cyan('npx create-fullstack-react-app')} ${chalk.yellow('my-app')}\n`);
    process.exit(1);
  }
  return projectName;
}

const filterPackageJson = file => !file.includes('/package.json');

function createProjectTemplate(projectName) {
  const frontendSource = path.join(__dirname, '../packages/react-ts');
  const backendSource = path.join(__dirname, '../packages/postgresql-server');
  const destinationPath = path.resolve(projectName);
  console.log(chalk.cyan('Project will be created at:'));
  console.log(chalk.cyan(destinationPath + '\n'));
  fs.mkdirsSync(destinationPath);
  fs.copySync(frontendSource, destinationPath, { filter: filterPackageJson });
  fs.copySync(backendSource, destinationPath, { filter: filterPackageJson });
}

try {
  useYarn();
  const projectName = checkProjectName();
  createProjectTemplate(projectName);
//   cp.spawn('yarn', ['install'], { cwd: projectName, stdio: 'inherit' });
} catch (e) {
  console.log(chalk.red(e));
  process.exit(1);
}