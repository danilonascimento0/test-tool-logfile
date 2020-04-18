import { report } from '../model/report.js';

export const findData = (line) => {
    if (line.includes("Executing request startRendering")) {
        let dataObject = createDataObject(line);
        // Creates a new line on report using the thread as key
        report.rendering[dataObject.thread] = createDataObject(line);
    } else if (line.includes("Service startRendering returned")) {
        setReturnedUID(line);
    }

    return report;
};

const setReturnedUID = (line) => {
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
