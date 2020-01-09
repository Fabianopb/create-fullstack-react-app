#!/usr/bin/env node
const chalk = require('chalk');
const cp = require('child_process');

const clients = [
  { path: 'react-js', name: 'MongoDB' },
  { path: 'react-ts', name: 'PostgreSQL' },
];

const servers = [
  { path: 'mongodb-server', name: 'MongoDB' },
  { path: 'postgresql-server', name: 'PostgreSQL' },
];

(() => {
  clients.forEach(client => {
    servers.forEach(server => {
      console.log(
        chalk.cyan('creating app with'),
        chalk.yellow(client.name),
        chalk.cyan('&'),
        chalk.yellow(server.name),
        chalk.cyan('sample from template...'),
      );
      cp.execSync(`yarn create-sample ${client.path} ${server.path}`, { stdio: 'inherit' });

      console.log(chalk.cyan('Testing frontend...'));
      cp.execSync('yarn test-client', { cwd: 'sample-app', stdio: 'inherit' });

      console.log(chalk.cyan('Testing server...'));
      cp.execSync('yarn test-server', { cwd: 'sample-app', stdio: 'inherit' });

      console.log(chalk.cyan('Building frontend...'));
      cp.execSync('yarn build-client', { cwd: 'sample-app', stdio: 'inherit' });

      console.log(chalk.cyan('Building server...'));
      cp.execSync('yarn build-server', { cwd: 'sample-app', stdio: 'inherit' });

      console.log(chalk.cyan('cleaning sample...'));
      cp.execSync('yarn clean', { stdio: 'inherit' });
    });
  });
})();
