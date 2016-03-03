'use strict';

/* global assert, fs, path, Sassaby,  */

describe('jigsass-tools-maps', () => {
  const file = path.resolve(__dirname, 'helpers/importer.scss');

  describe('jigsass-get', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'map': '(string: l1-string, l2: (string: l2-string, l3: (string: l3-string)))',
      },
    });

    it('Returned value of a non-nested key', () => {
      sassaby.func('jigsass-get').calledWithArgs('$map', 'string').equals('l1-string');
    });

    it('Returned value of a nested key', () => {
      sassaby.func('jigsass-get').calledWithArgs('$map', 'l2', 'l3', 'string').equals('l3-string');
    });

    describe('Errors', () => {
      it('Threw an error when a non-nested key was not found', () => {
        assert.throws(() => {
          sassaby.func('jigsass-get').calledWithArgs('$map', 'bogous');
        },
        /Error: jigsass-get: Could not find `bogous` in `\(string: l1-string, l2: \(string: l2-string, l3: \(string: l3-string\)\)\)`./,
        'It didn\'t throw...');
      });

      it('Threw an error when a nested key was not found', () => {
        assert.throws(() => {
          sassaby.func('jigsass-get').calledWithArgs('$map','l2', 'bogous');
        },
        /Error: jigsass-get: Could not find `bogous` in `\(string: l2-string, l3: \(string: l3-string\)\)`./,
        'It didn\'t throw...');
      });

      it('Threw an error when `$map` is not a map', () => {
        assert.throws(() => {
          sassaby.func('jigsass-get').calledWithArgs('some-string','l2', 'bogous');
        },
        /Error: jigsass-get: `some-string` is a string, not a map./,
        'It didn\'t throw...');
      });
    });
  });
});
