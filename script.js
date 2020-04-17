const fs = require('fs');
const util = require('util');
const lineReader = require('line-reader');

var lineByLine = util.promisify(lineReader.eachLine);
var report = {
    rendering: [],
    summary: []
};

const doIt = () => {
    scanFileByLine("server.log")
        .then(() => createFile("scanning-result.json", report));
};

const scanFileByLine = async (fileName) => {
    return lineByLine(fileName, (line) => {
        findData(line);
    });
};

const findData = (line) => {
    if (line.includes("Executing request startRendering")) {
        let dataObject = createDataObject(line);
        report.rendering[dataObject.thread] = createDataObject(line); // Creates a new line on report
    } else if (line.includes("Service startRendering returned")) {
        scanForReturnedUID(line);
    }

    return report;
};

const scanForReturnedUID = (line) => {
    let lineDataArray = line.split(" ");
    let thread = lineDataArray[2];
    let dataObject = report.rendering[thread];
    if (dataObject)
        dataObject.uid = lineDataArray[9];
};

const createDataObject = (lineData) => {
    let lineDataArray = lineData.split(" ");
    return {
        datetime: lineDataArray[0].concat(" "+lineDataArray[1]),
        thread: lineDataArray[2],
        // level: array[3],
        // class: array[5],
        // message: lineDataArray.slice(6).join(" ")
        document: lineDataArray[11].match(/\d+/)[0], // Will find the number inside that position
        page: lineDataArray[12].match(/\d+/)[0] // Will find for number inside that position
    }
};

const createFile = async (name, data) => {
    fs.writeFile(name, data, () => console.log(name + " file has been saved."));
};

doIt();