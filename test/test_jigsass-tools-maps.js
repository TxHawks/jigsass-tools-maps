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
    it('Set a key in an empty list', () => {
      sassaby.func('inspect')
        .calledWithArgs('jigsass-set((), l2, new-key, another-key, new-value)')
        .equals('(l2:(new-key:(another-key:new-value)))');
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
      it('Threw an error when `$map` is not a map or an empty list', () => {
        assert.throws(() => {
          sassaby.func('jigsass-set').calledWithArgs('some-string','l2', 'bogous');
        },
        /Error: jigsass-set: `some-string` is a string, not a map./,
        'It didn\'t throw...');
      });
    });
  });

  describe('jigsass-deep-has-key', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'map': '(string: l1-string, l2: (l3: (string: l3-string)))',
      },
    });

    it('Found a nested key', () => {
      sassaby.func('jigsass-deep-has-key').calledWithArgs('$map','l2','l3', 'string').isTrue();
    });
  });

  describe('jigsass-merge-deep', () => {
    const expectedMultipleSources = `(string:l1-string,l2:(l3:(string:l3-string),overwrite:overwritten,new-key:new-value),l2-source1:(string:source1-string,source1-key:value))`;

    const expectedSingleSource = `(string:l1-string,l2:(l3:(string:l3-string),overwrite:original),l2-source1:(string:source1-string,source1-key:value))`;

    const sassaby = new Sassaby(file, {
      variables: {
        'map': `(
          string: l1-string,
          l2: (
            l3: (string: l3-string),
            overwrite: original,
          ),
        )`,
        'source1': `(
          l2-source1: (
            string: source1-string,
            source1-key: value,
          ),
        )`,
        'source2': `(
          l2: (
            new-key: new-value,
            overwrite: overwritten,
          ),
        )`,
      },
    });

    it('Correctly merged two nested maps', () => {
      sassaby.func('inspect')
        .calledWithArgs('jigsass-deep-merge($map, $source1)')
        .equals(expectedSingleSource);
    });
    it('Correctly merged multiple nested maps', () => {
      sassaby.func('inspect')
        .calledWithArgs('jigsass-deep-merge($map, $source1, $source2)')
        .equals(expectedMultipleSources);
    });


    describe('Errors', () => {
      it('Threw an error when trying to merge into something that is not a is not a map', () => {
        assert.throws(() => {
          sassaby.func('jigsass-deep-merge').calledWithArgs('some-string','(l2: bogous)');
        },
        /Error: jigsass-deep-merge: Only maps can be merged into, but `some-string` is a string./,
        'It didn\'t throw...');
      });

      it('Threw an error when trying to merge something that is not a is not a map', () => {
        assert.throws(() => {
          sassaby.func('jigsass-deep-merge').calledWithArgs('$map','bogous');
        },
        /Error: jigsass-deep-merge: Only maps can be merged, but `bogous` is a string./,
        'It didn\'t throw...');
      });
    });
  });
});
