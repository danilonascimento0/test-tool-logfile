export var report = {
    rendering: [],
    summary: {
        count: 0,
        duplicates: 0,
        unnecessary: 0
    }
};

export const resultReportJSON = () => {
    report.summary.count = report.rendering.length;
    let result = JSON.stringify({
        report: {
            rendering: Object.values(report.rendering),
            summary: report.summary
        }
    });
    return result;
};