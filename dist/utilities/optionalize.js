"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBoolean = exports.isBoolean = exports.getOptions = void 0;

// eslint-disable-next-line flowtype/no-weak-types
const isBoolean = value => {
  return typeof value === 'boolean';
};

exports.isBoolean = isBoolean;

const toBoolean = (value, defaultValue) => {
  if (isBoolean(value)) {
    return value;
  }

  return isBoolean(defaultValue) ? defaultValue : Boolean(value);
};

exports.toBoolean = toBoolean;

const getSortOptions = options => {
  const {
    sortArguments,
    sortDefinitions,
    sortFields
  } = options || {};
  return {
    sortArguments: toBoolean(sortArguments, true),
    sortDefinitions: toBoolean(sortDefinitions, true),
    sortFields: toBoolean(sortFields, true)
  };
};

const getOptions = options => {
  const sortOptions = getSortOptions(options);
  return sortOptions;
};

exports.getOptions = getOptions;
//# sourceMappingURL=optionalize.js.map