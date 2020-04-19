import { report } from '../model/report.js';

const arrayByThread = []; // Array for managing threads while waiting for return

export const findData = (line) => {
    let lineDataArray = line.split(" ");

    if (line.includes("Executing request startRendering")) {
        addRequest(lineDataArray);
    } else if (line.includes("Service startRendering returned")) {
        setReturnedUID(lineDataArray, arrayByThread);
    }

    return report;
};

const addRequest = (lineDataArray) => {
    createDataObject(lineDataArray, (dataObject) => {
        // Creates a new line on report using the thread as key
        documentPosition(dataObject, (position) => {
            if (!report.rendering[position]) {
                report.rendering[position] = dataObject;
            } else {
                report.rendering[position].start = report.rendering[position].start.concat(dataObject.start);
            }
        });
        arrayByThread[lineDataArray[2]] = dataObject;
    });
};

const setReturnedUID = (lineDataArray, arrayByThread) => {
    let thread = lineDataArray[2];
    let dataObject = arrayByThread[thread];
    if (dataObject) {
        documentPosition(dataObject, (position) => {
            report.rendering[position].uid = lineDataArray[9];
        })
    }
};

const createDataObject = (lineDataArray, callback) => {
    callback(
        {
            document: lineDataArray[11].match(/\d+/)[0], // Will find the number inside that position
            page: lineDataArray[12].match(/\d+/)[0], // Will find for number inside that position
            start: [ lineDataArray[0].concat(" "+lineDataArray[1]) ]
            // thread: lineDataArray[2],
            // level: array[3],
            // class: array[5],
            // message: lineDataArray.slice(6).join(" ")
        }
    );
};

const documentPosition = (dataObject, callback) => callback(`${dataObject.document}-${dataObject.page}`);
