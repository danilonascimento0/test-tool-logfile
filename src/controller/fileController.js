import { findData } from './dataController.js';

const fs = require('fs');
const util = require('util');
const lineReader = require('line-reader');

const lineByLine = util.promisify(lineReader.eachLine);
export const scanFileByLine = async (fileName) => {
    return lineByLine(fileName, (line) => {
        findData(line);
    });
};

export const createFile = async (name, data) => {
    fs.writeFile(name, data, () => console.log(name + " file has been saved."));
};