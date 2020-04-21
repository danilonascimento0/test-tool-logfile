import { report } from '../model/report.js';

const arrayByThread = []; // Array for managing threads while waiting for return

export const findData = (line) => {
    let lineDataArray = line.split(" ");

    if (line.includes("Executing request startRendering")) {
        addRequest(lineDataArray);
    } else if (line.includes("Service startRendering returned")) {
        setReturnedUID(lineDataArray, arrayByThread);
    } else if (line.includes("type=request, name=getRendering")) {
        addGetRequest(lineDataArray);
    }
};

const addRequest = (lineDataArray) => {
    createDataObject(lineDataArray, (dataObject) => {
        // Creates a new line on report using the thread as key
        documentPosition(dataObject, (position) => {
            if (!report.rendering[position]) {
                report.rendering[position] = dataObject;
                report.summary.unnecessary++; // Counting how many calls were done then we subtract
            } else {
                report.rendering[position].start = report.rendering[position].start.concat(dataObject.start);
                report.summary.duplicates++; // If is the second call, this already is a duplicate
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

const addGetRequest = (lineDataArray) => {
    // Looks like the uid is changing for the same request
    // I'm not sure if it should happen and how I should proceed
    // However, I am saving the gets as they appear, so we can have something to work with
    lineDataArray[9] = lineDataArray[9].replace("{arguments=[", "").replace("],", "");
    let object = Object.values(report.rendering).find(el => el.uid === lineDataArray[9]);
    if (object) {
        object.get = object.get.concat(lineDataArray[0].concat(" "+lineDataArray[1]));

        // If this is the first get, means we have less one unnecessary call
        if (object.get.length === 1) report.summary.unnecessary--;
    }
};

const createDataObject = (lineDataArray, callback) => {
    callback (
        {
            document: lineDataArray[11].match(/\d+/)[0], // Will find the number inside that position
            page: lineDataArray[12].match(/\d+/)[0], // Will find for number inside that position
            start: [ lineDataArray[0].concat(" "+lineDataArray[1]) ],
            get: [ ]
            // thread: lineDataArray[2],
            // level: array[3],
            // class: array[5],
            // message: lineDataArray.slice(6).join(" ")
        }
    );
};

const documentPosition = (dataObject, callback) => callback(`${dataObject.document}-${dataObject.page}`);
