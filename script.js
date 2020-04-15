const fs = require('fs');

const doIt = () => {
    const serverLogData = getFileData("server.log");

    scan(serverLogData)

    // createFile("scanning-result.json", "some random data");
};

const scan = (data) => {
    const arrayData = data.split('\n');

    arrayData.map(lineData => {
        // console.log(lineData);
    })
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