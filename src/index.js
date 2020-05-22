#!/usr/bin/env node
import chalk from 'chalk';
import cp from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import deepMerge from 'deepmerge';
import inquirer from 'inquirer';
import { clientChoices, serverChoices, filterFiles, useYarn, checkProjectName } from './utils';

const createProjectTemplate = (projectName, frontend, database) => {
  const backendSource = path.join(__dirname, `../templates/${database}`);
  if (!fs.existsSync(backendSource)) {
    console.log(chalk.red(`Backend '${database}' setup not found!\n`));
    process.exit(1);
  }
  const frontendSource = path.join(__dirname, `../templates/${frontend}`);
  if (!fs.existsSync(frontendSource)) {
    console.log(chalk.red(`Frontend '${frontend}' setup not found!\n`));
    process.exit(1);
  }
  const destinationPath = path.resolve(projectName);
  console.log(chalk.cyan('Project will be created at:'));
  console.log(chalk.cyan(destinationPath + '\n'));
  // Scafold application
  fs.mkdirsSync(destinationPath);
  fs.copySync(frontendSource, destinationPath, { filter: filterFiles });
  fs.copySync(backendSource, destinationPath, { filter: filterFiles });
  // Rename gitignore to .gitignore
  fs.moveSync(path.join(destinationPath, 'gitignore'), path.join(destinationPath, '.gitignore'));
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
  // Skip preflight check in sample mode to avoid react-scripts conflicting with root dependencies
  if (process.env.SKIP_PREFLIGHT_CHECK === 'true') {
    fs.writeFileSync(path.join(destinationPath, '.env'), 'SKIP_PREFLIGHT_CHECK=true');
  }
};

(async () => {
  try {
    const projectName = process.argv[2];
    const frontend = process.argv[3];
    const database = process.argv[4];
    useYarn();
    checkProjectName(projectName);
    const frontendAnswer = frontend
      ? { frontend }
      : await inquirer.prompt([
          {
            type: 'list',
            name: 'frontend',
            message: 'What frontend do you want to use?',
            choices: clientChoices,
          },
        ]);
    const backendAnswer = database
      ? { database }
      : await inquirer.prompt([
          {
            type: 'list',
            name: 'database',
            message: 'What database do you want to use?',
            choices: serverChoices,
          },
        ]);
    createProjectTemplate(projectName, frontendAnswer.frontend, backendAnswer.database);
    cp.spawn('yarn', ['install'], { cwd: projectName, stdio: 'inherit' });
  } catch (e) {
    console.log(chalk.red(e));
    process.exit(1);
  }
})();
