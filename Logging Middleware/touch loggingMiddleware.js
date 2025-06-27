// loggingMiddleware.js
const axios = require("axios");

// 👇 Replace this with YOUR actual token
const accessToken = "YOUR_ACCESS_TOKEN";

const log = async (stackLevel, message) => {
  try {
    const response = await axios.post(
      "http://20.244.56.144/log",
      {
        level: stackLevel,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Log sent:", response.data);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};

module.exports = log;
