import { scanFileByLine, createFile } from './src/controller/fileController.js';
import { report } from './src/model/report.js';

const start = () => {
    scanFileByLine("server.log")
        // .then(() => console.log(report))
        .then(() => createFile("scanning-result.json", report));
};

start();