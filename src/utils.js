import chalk from 'chalk';
import cp from 'child_process';

export const clientChoices = [
  { name: 'Traditional ReactJS (jsx)', value: 'react-js' },
  { name: 'React with TypeScript (tsx)', value: 'react-ts' },
];

export const serverChoices = [
  { name: 'PostgreSQL', value: 'postgresql-server' },
  { name: 'MongoDB', value: 'mongodb-server' },
];

export const useYarn = () => {
  try {
    cp.execSync('yarnpkg --version', { stdio: 'ignore' });
    console.log(chalk.cyan("Yarn found! You're good to go!\n"));
  } catch (e) {
    console.log(
      chalk.red('Yarn not found. Please go to https://yarnpkg.com/ install yarn and try again.'),
    );
    process.exit(1);
  }
};

export const checkProjectName = projectName => {
  if (!projectName) {
    console.log(chalk.red('Project name has to be specified. Try for example:'));
    console.log(`  ${chalk.cyan('npx create-fullstack-react-app')} ${chalk.yellow('my-app')}\n`);
    process.exit(1);
  }
};

export const filterFiles = source => {
  const templateSrc = source.split('template')[1];
  return (
    !templateSrc.includes('/package.json') &&
    !templateSrc.includes('/README.md') &&
    !templateSrc.includes('/node_modules') &&
    !templateSrc.includes('/coverage') &&
    !templateSrc.includes('/build')
  );
};
