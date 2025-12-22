const express = require("express");
const cors = require("cors");
const fbdown = require("./fbdown");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Thiếu query ?url="
      });
    }

    const data = await fbdown(url);

    res.json({
      success: true,
      data
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
