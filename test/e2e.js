#!/usr/bin/env node
const chalk = require('chalk');
const cp = require('child_process');

(() => {
  console.log(
    chalk.cyan('creating '),
    chalk.cyan('MongoDB'),
    chalk.cyan(' sample from template...'),
  );
  cp.execSync('yarn create-sample mongodb', { stdio: 'inherit' });

  console.log(chalk.cyan('Testing frontend...'));
  cp.execSync('yarn test', { cwd: 'sample-app', stdio: 'inherit' });

  console.log(chalk.cyan('Testing server...'));
  cp.execSync('yarn test-server', { cwd: 'sample-app', stdio: 'inherit' });

  console.log(chalk.cyan('Building frontend...'));
  cp.execSync('yarn build', { cwd: 'sample-app', stdio: 'inherit' });

  console.log(chalk.cyan('Building server...'));
  cp.execSync('yarn build-server', { cwd: 'sample-app', stdio: 'inherit' });

  console.log(chalk.cyan('cleaning sample...'));
  cp.execSync('yarn clean', { stdio: 'inherit' });
})();
