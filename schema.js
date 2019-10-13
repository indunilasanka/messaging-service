const { mergeTypes } = require('merge-graphql-schemas');
const {
  readFileSync, readdirSync, existsSync, writeFileSync,
} = require('fs');

module.exports = () => {
  const types = [];

  readdirSync(`${__dirname}/src/schema`)
    .forEach(file => {
      const path = `${__dirname}/src/schema/${file}`;
      if (existsSync(path)) {
        types.push(readFileSync(path, 'utf8'));
      }
    });

  writeFileSync(`${__dirname}/schema.graphql`, mergeTypes(types));

  return 'schema.graphql';
};
