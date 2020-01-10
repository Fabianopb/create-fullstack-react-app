import { filterFiles } from './utils';

describe('index source tests', () => {
  describe('filterFiles() returns false for undesired paths', () => {
    test('when path contains package.json', () => {
      expect(filterFiles('create-fullstack-react-app/template/package.json')).toBeFalsy();
    });

    test('when path contains README.md', () => {
      expect(filterFiles('create-fullstack-react-app/template/README.md')).toBeFalsy();
    });

    test('when path contains node_modules after template', () => {
      expect(filterFiles('create-fullstack-react-app/template/node_modules/')).toBeFalsy();
    });

    test('when path contains coverage folder', () => {
      expect(filterFiles('create-fullstack-react-app/template/coverage/')).toBeFalsy();
    });

    test('when path contains build folder', () => {
      expect(filterFiles('create-fullstack-react-app/template/build/')).toBeFalsy();
    });

    test('allows node_modules before template', () => {
      expect(
        filterFiles('temp/node_modules/create-fullstack-react-app/template/index.js'),
      ).toBeTruthy();
    });
  });
});
