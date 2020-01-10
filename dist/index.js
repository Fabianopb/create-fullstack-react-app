#!/usr/bin/env node
'use strict';
var _chalk = _interopRequireDefault(require('chalk')),
  _child_process = _interopRequireDefault(require('child_process')),
  _fsExtra = _interopRequireDefault(require('fs-extra')),
  _path = _interopRequireDefault(require('path')),
  _deepmerge = _interopRequireDefault(require('deepmerge')),
  _inquirer = _interopRequireDefault(require('inquirer')),
  _utils = require('./utils');
function _interopRequireDefault(a) {
  return a && a.__esModule ? a : { default: a };
}
const createProjectTemplate = (a, b, c) => {
  const d = _path.default.join(__dirname, `../templates/${c}`);
  _fsExtra.default.existsSync(d) ||
    (console.log(_chalk.default.red(`Backend '${c}' setup not found!\n`)), process.exit(1));
  const e = _path.default.join(__dirname, `../templates/${b}`);
  _fsExtra.default.existsSync(e) ||
    (console.log(_chalk.default.red(`Frontend '${b}' setup not found!\n`)), process.exit(1));
  const f = _path.default.resolve(a);
  console.log(_chalk.default.cyan('Project will be created at:')),
    console.log(_chalk.default.cyan(f + '\n')),
    _fsExtra.default.mkdirsSync(f),
    _fsExtra.default.copySync(e, f, { filter: _utils.filterFiles }),
    _fsExtra.default.copySync(d, f, { filter: _utils.filterFiles }),
    _fsExtra.default.moveSync(
      _path.default.join(f, 'gitignore'),
      _path.default.join(f, '.gitignore'),
    ); // Create package.json
  const g = _fsExtra.default.readFileSync(_path.default.join(e, 'package.json')),
    h = _fsExtra.default.readFileSync(_path.default.join(d, 'package.json')),
    i = JSON.parse(g),
    j = JSON.parse(h),
    k = { ...(0, _deepmerge.default)(i, j), name: a };
  _fsExtra.default.writeFileSync(_path.default.join(f, 'package.json'), JSON.stringify(k, null, 2)); // Create README.md
  const l = _fsExtra.default.readFileSync(_path.default.join(e, 'README.md'), 'utf8'),
    m = _fsExtra.default.readFileSync(_path.default.join(d, 'README.md'), 'utf8');
  _fsExtra.default.writeFileSync(_path.default.join(f, 'README.md'), `${l}\n\n${m}`);
};
(async () => {
  try {
    const a = process.argv[2],
      b = process.argv[3],
      c = process.argv[4];
    (0, _utils.useYarn)(), (0, _utils.checkProjectName)(a);
    const d = b
        ? { frontend: b }
        : await _inquirer.default.prompt([
            {
              type: 'list',
              name: 'frontend',
              message: 'What frontend do you want to use?',
              choices: _utils.clientChoices,
            },
          ]),
      e = c
        ? { database: c }
        : await _inquirer.default.prompt([
            {
              type: 'list',
              name: 'database',
              message: 'What database do you want to use?',
              choices: _utils.serverChoices,
            },
          ]);
    createProjectTemplate(a, d.frontend, e.database),
      _child_process.default.spawn('yarn', ['install'], { cwd: a, stdio: 'inherit' });
  } catch (a) {
    console.log(_chalk.default.red(a)), process.exit(1);
  }
})();
