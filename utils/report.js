const report = (...args) => console.log(...args);

report.report = report;

report.warn = (...args) => console.warn(...args);

report.error = (...args) => console.error(...args);

module.exports = report;