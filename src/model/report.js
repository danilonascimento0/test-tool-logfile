export var report = {
    rendering: [],
    summary: []
};

export const resultReportJSON = () => {
    let result = JSON.stringify({
        report: {
            rendering: Object.values(report.rendering)
        }
    });
    return result;
};