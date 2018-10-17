'use strict';

const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generateCommand = require(`../src/commands/generate`);

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const COMMAND = ``;
const QUANTITY_OBJECT = 10;

describe(`Generate JSON command`, function () {
  it(`should fail on non existing folder`, function () {
    const tempFileName = `${__dirname}/json/testfile.json`;

    return generateCommand.execute(COMMAND, QUANTITY_OBJECT, tempFileName)
      .then(() => assert.fail(`Path ${tempFileName} should not be available`))
      .catch((e) => assert.ok(e));
  });

  it(`should create new file`, function () {
    const tempFileName = `${__dirname}/testfile.json`;

    return generateCommand.execute(COMMAND, QUANTITY_OBJECT, tempFileName)
      .then(access(tempFileName))
      .then(unlink(tempFileName));
  });
  it(`check JSON file`, function () {
    const tempFileName = `${__dirname}/json/testfile.json`;

    let testJSON = require(tempFileName);
    for (let item of testJSON) {
      console.log(item);
    }
  });
});
