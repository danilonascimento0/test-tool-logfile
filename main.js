import { scanFileByLine, createFile } from './src/controller/fileController.js';
import { report } from './src/model/report.js';

const start = () => {
    scanFileByLine("server.log")
        .then(() => createFile("scanning-result.json", report))
        .catch(function(e) { console.log(e); });
};

start();