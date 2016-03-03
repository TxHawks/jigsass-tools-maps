# JigSass Tools Maps
[![NPM version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]   

 > Map helper functions

## Installation

Using npm:

```sh
npm i -S jigsass-tools-maps
```

## Usage
`@import 'path/to/jigsass-tools-maps/index.scss';` should give you all you need.

`jigsass-tools-maps` provides the following utility functions:

<dl>
  <dt><strong>jigsass-get</strong></dt>
  <dd>Get a value from nested maps</dd>
  <dt><strong>jigsass-set</strong></dt>
  <dd>Set a value in nested maps</dd>
  <dt><strong>jigsass-deep-has-key</strong></dt>
  <dd>Check if a map has a nested key </dd>
  <dt><strong>jigsass-merge-deep</strong></dt>
  <dd>Recursively assign values from multiple maps into a single map</dd>
</dl>

For further details, see the documentation located in The `sassdoc` directory. 

## Documention

Documentation of JigSass Tools Maps's Sass features is generated by [SassDoc](http://sassdoc.com).

Run `gulp serve:sassdoc` to fire up a live server serving the documentation.

To generate documentation from annotation in the source code, run `gulp sass:doc`.

To disable the generation of sass documentation, create an empty `noSassDoc`
file at the root jigsass-tools-maps directory.

## Development

It is a best practice for JigSass modules to *not* automatically generate css on `@import`, but 
rather have to user explicitly enable the generation of specific styles from the module.

Contributions in the form of pull-requests, issues, bug reports, etc. are welcome.
Please feel free to fork, hack or modify JigSass Tools Maps in any way you see fit.

#### Writing documentation

Good documentation is crucial for scalability and maintainability. When writing your module,
please do make sure that both its Sass functionality (functions, mixins, 
variables and placeholder selectors), as well as the CSS it generates (selectors, 
concepts, usage exmples, etc.) are well documented.

As mentioned above, the Sass is documented using SassDoc 
([Documention](http://sassdoc.com/annotations/)).

#### Running tests
`gulp lint` will, well, lint the contents scss files in the `scss` directory.

`gulp test` with run module's test using Mocha and Sassaby.

`gulp tdd` will watch both the Sass files and the test specs for changes, and will
run tests automatically upon them.

#### Writing tests

JigSass Tools Maps tests are written using [Sassaby](https://github.com/ryanbahniuk/sassaby)
and Mocha. Spec files are located in the `test` directory.

Mocha allows us to place a call to `before()` in the root of any test file and it 
will be run once, before all the other tests in every `test_*.js` file. 
We can also `require()` files and assign them to the global object to make them 
available to all `test_*.js` files. 

jigsass-tools-maps uses a file called `helper.js` can be used to set up mocha 
globals requires and `before()`.

In addition to Sassaby's testing functions, jigsass-tools-maps makes a few Sass
functions available to the test suite, for use inside Sassaby tests:

<dl>
  <dt>jig-var-equals($value, $var) -> {boolean}<dt>
  <dd>
		Check if a variable equals a value.<br />
		<strong>$value</strong> {*}: A value to compare the value of $var to.<br />
		<strong>$var</strong> {*}: The variable to test<br />
	</dd>
  <dt>jig-var-type-is($type, $var) -> {boolean}<dt>
  <dd>
		Check if a variable is of a certain type.<br />
		<strong>$type</strong> {string}: A type to compare with the type of $var.<br />
		<strong>$var</strong> {*}: The variable to test<br />
	</dd>
  <dt>jig-map-key-equals($value, $map, $keys...) -> {boolean}<dt>
  <dd>
		Check if a map's key is assigned a cerain value.<br />
		<strong>$value</strong> {*}:  A value to compare the value of a key in $map with.<br />
		<strong>$map</strong> {map}: The map to test.<br />
		<strong>$keys... </strong> {arglist}: A recursive chain of keys.<br />
	</dd>
  <dt>jig-map-key-type-is($type, $map, keys...) -> {boolean}<dt>
  <dd>
		Check if a map's key is of a certain type<br />
		<strong>$type</strong> {string}: A type to compare with the type of $var.<br />
		<strong>$map</strong> {map}: The map to test.<br />
		<strong>$keys... </strong> {arglist}: A recursive chain of keys.<br />
	</dd>
</dl>


## File structure
```bash
┬ ./
│
├─┬ scss/ 
│ └─ index.scss # The module's importable file.
│
├── sassdoc/    # Generated documentation 
│               # of the module's sass features
│
└─┬─ test/
  │
  ├─┬ helpers/
  │ │
  │ ├── importer.scss       # Used for easilty importing tested scss files
  │ │
  │ └── _test_helpers.scss  # JigSass's assertion helpers,
  │                         # for use inside Sassaby tests.
  │                         
  ├── helper.js              # Used for defining global `before()`
  │                          # functions and requiring modules.
  │                         
  └── test_jigsass-tools-maps  # Specs. Mocha will automatically 
                             # run all javascript files located
                             # in the `test` directory.
```

**License:** MIT



[npm-image]: https://badge.fury.io/js/jigsass-tools-maps.svg
[npm-url]: https://npmjs.org/package/jigsass-tools-maps

[travis-image]: https://travis-ci.org/TxHawks/jigsass-tools-maps.svg?branch=master
[travis-url]: https://travis-ci.org/TxHawks/jigsass-tools-maps
[daviddm-image]: https://david-dm.org/TxHawks/jigsass-tools-maps.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/TxHawks/jigsass-tools-maps
