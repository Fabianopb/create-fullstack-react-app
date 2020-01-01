#!/usr/bin/env node
const chalk = require('chalk');
const cp = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const deepMerge = require('deepmerge');
const inquirer = require('inquirer');

function useYarn() {
  try {
    cp.execSync('yarnpkg --version', { stdio: 'ignore' });
    console.log(chalk.cyan("Yarn found! You're good to go!\n"));
  } catch (e) {
    console.log(
      chalk.red('Yarn not found. Please go to https://yarnpkg.com/ install yarn and try again.'),
    );
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

const filterFiles = source =>
  !source.includes('/package.json') &&
  !source.includes('/README.md') &&
  !source.includes('node_modules') &&
  !source.includes('coverage') &&
  !source.includes('build');

function createProjectTemplate(projectName, database) {
  const backendSource = path.join(__dirname, `../templates/${database}-server`);
  console.log(backendSource);
  if (!fs.existsSync(backendSource)) {
    console.log(chalk.red(`${database} setup not found! This should never happen!\n`));
    process.exit(1);
  }
  const frontendSource = path.join(__dirname, '../templates/react-ts');
  console.log(frontendSource);
  const destinationPath = path.resolve(projectName);
  console.log(destinationPath);
  console.log(chalk.cyan('Project will be created at:'));
  console.log(chalk.cyan(destinationPath + '\n'));
  // Scafold application
  fs.mkdirsSync(destinationPath);
  fs.copySync(frontendSource, destinationPath, { filter: filterFiles });
  fs.copySync(backendSource, destinationPath, { filter: filterFiles });
  // Create package.json
  const frontendPackageJson = fs.readFileSync(path.join(frontendSource, 'package.json'));
  const backendPackageJson = fs.readFileSync(path.join(backendSource, 'package.json'));
  const frontendPackageObject = JSON.parse(frontendPackageJson);
  const backendPackageObject = JSON.parse(backendPackageJson);
  const mergedPackageObject = {
    ...deepMerge(frontendPackageObject, backendPackageObject),
    name: projectName,
  };
  fs.writeFileSync(
    path.join(destinationPath, 'package.json'),
    JSON.stringify(mergedPackageObject, null, 2),
  );
  // Create README.md
  const frontendReadme = fs.readFileSync(path.join(frontendSource, 'README.md'), 'utf8');
  const backendReadme = fs.readFileSync(path.join(backendSource, 'README.md'), 'utf8');
  fs.writeFileSync(
    path.join(destinationPath, 'README.md'),
    `${frontendReadme}\n\n${backendReadme}`,
  );
}

(() => {
  try {
    useYarn();
    const projectName = checkProjectName();
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'database',
          message: 'What database do you want to use?',
          choices: ['PostgreSQL', 'MongoDB'],
          filter: val => val.toLowerCase(),
        },
      ])
      .then(answers => {
        createProjectTemplate(projectName, answers.database);
        cp.spawn('yarn', ['install'], { cwd: projectName, stdio: 'inherit' });
      });
  } catch (e) {
    console.log(chalk.red(e));
    process.exit(1);
  }
})();
