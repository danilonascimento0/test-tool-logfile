const fs = require('fs');

const test = () => {
    const serverLogData = getFileData("server.log");

    createFile("scanning-result.json", "some random data");
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

test();