const { spawn } = require("child_process");
const path = require("path");

async function generateDescription(req, res) {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    const scriptPath = path.join(__dirname, '..', '..', 'services', 'scraper.py');

    const pythonProcess = spawn("python3", [
      scriptPath,
      productName,
    ], {
      env: {
        ...process.env,
        COHERE_API_KEY: process.env.COHERE_API_KEY,
        REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID,
        REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET,
      }
    });

    let dataString = "";
    let errorString = "";

    pythonProcess.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorString += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        console.error(errorString);
        return res.status(500).json({
          success: false,
          message: "Failed to generate description from script",
          error: errorString,
        });
      }

      try {
        const result = JSON.parse(dataString);
        if (result.error) {
            return res.status(500).json({
                success: false,
                message: result.error,
            });
        }
        res.status(200).json({
          success: true,
          data: result.summary,
        });
      } catch (e) {
        return res.status(500).json({
          success: false,
          message: "Failed to parse description from script",
          error: dataString,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}

module.exports = { generateDescription }; 