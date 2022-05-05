#!/usr/bin/env node
"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _yargs = _interopRequireDefault(require("yargs"));

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const argv = _yargs.default.env('FG').help().usage('$0 <sdl-path>', 'Sort GraphQL schema definition language (SDL) document.', command => {
  command.positional('sdl-path', {
    description: 'Path to the GraphQL schema definition (SDL) document.',
    type: 'string'
  });
}).options({
  'sort-arguments': {
    default: true,
    description: 'Sort on arguments',
    type: 'boolean'
  },
  'sort-definitions': {
    default: true,
    description: 'Sort on definitions',
    type: 'boolean'
  },
  'sort-fields': {
    default: true,
    description: 'Sort on fields',
    type: 'boolean'
  },
  write: {
    default: false,
    description: 'Overrides contents of the SDL document.',
    type: 'boolean'
  }
}).parse();

const resolvedPath = _path.default.resolve(argv.sdlPath);

const inputSdl = _fs.default.readFileSync(resolvedPath, 'utf8');

const {
  write,
  sortArguments,
  sortDefinitions,
  sortFields
} = argv;
const outputSdl = (0, _utilities.formatSdl)(inputSdl, {
  sortArguments,
  sortDefinitions,
  sortFields
});

if (write) {
  _fs.default.writeFileSync(resolvedPath, outputSdl); // eslint-disable-next-line no-console


  console.log('Target SDL document has been overriden with the formatted SDL.');
} else {
  // eslint-disable-next-line no-console
  console.log(outputSdl);
}
//# sourceMappingURL=index.js.map