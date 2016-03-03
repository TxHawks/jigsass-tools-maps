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

  describe('jigsass-set', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'map': '(l2: (l3: (string: l3-string)))',
      },
    });

    it('Set a top level key', () => {
      sassaby.func('inspect')
        .calledWithArgs('jigsass-set($map, new-key, new-value)')
        .equals('(l2:(l3:(string:l3-string)),new-key:new-value)');
    });
    it('Set a nested key', () => {
      sassaby.func('inspect')
        .calledWithArgs('jigsass-set($map, l2, new-key, new-value)')
        .equals('(l2:(l3:(string:l3-string),new-key:new-value))');
    });
    it('Set nested keys', () => {
      sassaby.func('inspect')
        .calledWithArgs('jigsass-set($map, l2, new-key, another-key, new-value)')
        .equals('(l2:(l3:(string:l3-string),new-key:(another-key:new-value)))');
    });

    describe('Overwriting keys', () => {
      it('Overwrote an existing top level key', () => {
        sassaby.func('inspect')
          .calledWithArgs('jigsass-set($map, l2, overwritten)')
          .equals('(l2:overwritten)');
      });
      it('Overwrote an existing nested key', () => {
        sassaby.func('inspect')
          .calledWithArgs('jigsass-set($map, l2, l3, overwritten)')
          .equals('(l2:(l3:overwritten))');
      });
    });

    describe('Errors', () => {
      it('Threw an error when `$map` is not a map', () => {
        assert.throws(() => {
          sassaby.func('jigsass-set').calledWithArgs('some-string','l2', 'bogous');
        },
        /Error: jigsass-set: `some-string` is a string, not a map./,
        'It didn\'t throw...');
      });
    });
  });
});
