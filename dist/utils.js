'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.filterFiles = exports.checkProjectName = exports.useYarn = exports.serverChoices = exports.clientChoices = void 0);
var _chalk = _interopRequireDefault(require('chalk')),
  _child_process = _interopRequireDefault(require('child_process'));
function _interopRequireDefault(a) {
  return a && a.__esModule ? a : { default: a };
}
const clientChoices = [
  { name: 'Traditional ReactJS (jsx)', value: 'react-js' },
  { name: 'React with TypeScript (tsx)', value: 'react-ts' },
];
exports.clientChoices = clientChoices;
const serverChoices = [
  { name: 'PostgreSQL', value: 'postgresql-server' },
  { name: 'MongoDB', value: 'mongodb-server' },
];
exports.serverChoices = serverChoices;
const useYarn = () => {
  try {
    _child_process.default.execSync('yarnpkg --version', { stdio: 'ignore' }),
      console.log(_chalk.default.cyan("Yarn found! You're good to go!\n"));
  } catch (a) {
    console.log(
      _chalk.default.red(
        'Yarn not found. Please go to https://yarnpkg.com/ install yarn and try again.',
      ),
    ),
      process.exit(1);
  }
};
exports.useYarn = useYarn;
const checkProjectName = a => {
  a ||
    (console.log(_chalk.default.red('Project name has to be specified. Try for example:')),
    console.log(
      `  ${_chalk.default.cyan('npx create-fullstack-react-app')} ${_chalk.default.yellow(
        'my-app',
      )}\n`,
    ),
    process.exit(1));
};
exports.checkProjectName = checkProjectName;
const filterFiles = a => {
  const b = a.split('template')[1];
  return (
    !b.includes('/package.json') &&
    !b.includes('/README.md') &&
    !b.includes('/node_modules') &&
    !b.includes('/coverage') &&
    !b.includes('/build')
  );
};
exports.filterFiles = filterFiles;
