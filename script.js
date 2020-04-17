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

    arrayData.map(lineData => {
        // When start startRendering - "Executing request startRendering"
        if (lineData.includes("Executing request startRendering")) {
            let lineDataArray = lineData.split(" ");
            let lineDataObject = {
                date: lineDataArray[0], time: lineDataArray[1],
                thread: lineDataArray[2],
                // level: array[3],
                // class: array[5],
                // message: lineDataArray.slice(6).join(" ")
                document: lineDataArray[11].match(/\d+/)[0], // Will find the number inside that position
                page: lineDataArray[12].match(/\d+/)[0] // Will find for number inside that position
            };
        }
        // SAME THREAD
        // Return of startRendering - "Service startRendering returned ..."

        // Check if it will be necessary
        //if (!lineData.includes("   at")) { }
    });
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