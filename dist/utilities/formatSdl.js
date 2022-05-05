"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("graphql");

var _optionalize = require("./optionalize");

const sortSchema = (key, value, options) => {
  const {
    sortArguments,
    sortDefinitions,
    sortFields
  } = options;

  if (sortDefinitions && key === 'definitions' || sortFields && key === 'fields' || sortArguments && key === 'arguments') {
    return value.slice().sort((a, b) => {
      const nonNamedKinds = ['SchemaDefinition', 'SchemaExtension'];

      if (nonNamedKinds.includes(a.kind)) {
        return -1;
      }

      if (nonNamedKinds.includes(b.kind)) {
        return 1;
      }

      return a.name.value.localeCompare(b.name.value);
    });
  }

  return value;
};
/**
 * We only care about rearranging:
 * - definitions
 * - fields
 * - arguments
 *
 * A GraphQL Schema AST looks something like this:
 *
 *   {
 *     "definitions": [
 *       {
 *         fields: [
 *           {
 *             arguments: [
 *               ...
 *             ]
 *           }
 *           ...
 *         ],
 *       },
 *       ...
 *     ]
 *   }
 *
 * Note that there are no cycles -  we don't need to recurse through the whole
 * AST. There's a finite nest depth of 3 node types for us to walk down:
 *
 *   <start> -> definitions -> fields -> arguments
 */


const walkAST = (node, options, key) => {
  // Map a node type to the child node type we should walk down next
  const nextKey = {
    arguments: null,
    definitions: 'fields',
    fields: 'arguments'
  };

  if (!key) {
    return node;
  }

  if (!Array.isArray(node[key])) {
    return node;
  }

  node[key] = sortSchema(key, node[key], options).map(child => {
    return walkAST(child, options, nextKey[key]);
  });
  return node;
};

const formatSdl = (schemaSdl, options) => {
  return (0, _graphql.print)(walkAST((0, _graphql.parse)(schemaSdl), (0, _optionalize.getOptions)(options), 'definitions'));
};

var _default = formatSdl;
exports.default = _default;
//# sourceMappingURL=formatSdl.js.map