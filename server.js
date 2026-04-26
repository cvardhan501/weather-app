// require("dotenv").config();

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const PORT = 5000;
// const API_KEY = process.env.API_KEY;

// app.get("/weather", async (req, res) => {
//   const city = req.query.city;

//   if (!city) {
//     return res.status(400).json({ error: "City is required" });
//   }

//   try {
//     const response = await axios.get(
//       "https://api.openweathermap.org/data/2.5/weather",
//       {
//         params: {
//           q: city,
//           appid: API_KEY,
//           units: "metric",
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.log("FULL ERROR:", error.response?.data);

//     res.status(500).json({
//       error: error.response?.data?.message || "Something went wrong",
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
// app.get("/forecast", async (req, res) => {
//   const city = req.query.city;

//   try {
//     const response = await axios.get(
//       "https://api.openweathermap.org/data/2.5/forecast",
//       {
//         params: {
//           q: city,
//           appid: API_KEY,
//           units: "metric",
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Forecast error" });
//   }
// });
require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;
const API_KEY = process.env.API_KEY;

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data?.message || "Weather error",
    });
  }
});

app.get("/forecast", async (req, res) => {
  const city = req.query.city;

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data?.message || "Forecast error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});