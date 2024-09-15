const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", async (req, res) => {
  const url =
    "https://test.v5.pryaniky.com" + req.originalUrl.replace("/api", "");
  console.log("Получен запрос:", req.method, req.originalUrl, req.body);
  console.log("Тело запроса:", req.body);
  console.log("Заголовки запроса:", req.headers);

  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: {
        "Content-Type": "application/json",
        "x-auth": req.headers["x-auth"],
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      "Ошибка при проксировании запроса:",
      error.response ? error.response.data : error.message,
    );

    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "Ошибка при проксировании запроса" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
