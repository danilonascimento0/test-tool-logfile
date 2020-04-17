const fs = require('fs');

const doIt = () => {
    const serverLogData = getFileData("server.log");

    scan(serverLogData);

    // createFile("scanning-result.json", "some random data");
};

const scan = (data) => {
    const arrayData = data.split('\n');

    let report = {
        rendering: [],
        summary: []
    };

    for (let x = 0; x < arrayData.length; x++) {
        let lineData = arrayData[x];

        // When start startRendering - "Executing request startRendering"
        if (lineData.includes("Executing request startRendering")) {
            let lineDataObject = createDataObject(lineData);

            console.log(lineDataObject)
        }
        // SAME THREAD
        // Return of startRendering - "Service startRendering returned ..."

        // Check if it will be necessary
        //if (!lineData.includes("   at")) { }
    }
};

createDataObject = (lineData) => {
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

const getFileData = (fileName) => {
    try {
        return fs.readFileSync(fileName, "utf-8");
    } catch (err) {
        console.error(err);
    }
};

const createFile = (name, data) => {
    try {
        fs.writeFileSync(name, data);
        console.log(name + " file has been saved.");
    } catch (error) {
        console.error(err);
    }
};

doIt();