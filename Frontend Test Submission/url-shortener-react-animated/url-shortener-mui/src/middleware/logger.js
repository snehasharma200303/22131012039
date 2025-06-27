const logger = (msg) => {
  const logEntry = `[${new Date().toISOString()}] ${msg}`;
  window.appLogs = window.appLogs || [];
  window.appLogs.push(logEntry);
};

export default logger;