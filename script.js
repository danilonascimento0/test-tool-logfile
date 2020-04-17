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