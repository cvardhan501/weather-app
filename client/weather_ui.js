// // 🔍 Search weather
// async function getWeather() {
//   const city = document.getElementById("city").value.trim();

//   if (!city) {
//     alert("Enter city name");
//     return;
//   }

//   await loadWeather(city);
//   await loadForecast(city);
// }

// // 🌤 Load current weather
// async function loadWeather(city) {
//   const result = document.getElementById("result");
//   result.innerHTML = `<p>⏳ Loading...</p>`;

//   try {
//     const res = await fetch(
//   /weather?city=${encodeURIComponent(city)}
//   );

//     const data = await res.json();

//     if (data.error) {
//       result.innerHTML = `<p class="error">❌ ${data.error}</p>`;
//       return;
//     }

//     showWeather(data);
//   } catch (err) {
//     result.innerHTML = `<p class="error">⚠ Cannot connect to server</p>`;
//   }
// }

// // 📊 Load forecast
// async function loadForecast(city) {
//   const forecastBox = document.getElementById("forecast");
//   forecastBox.innerHTML = "";

//   try {
//     const res = await fetch(
//   /forecast?city=${encodeURIComponent(city)}
//    );

//     const data = await res.json();

//     if (data.error) {
//       forecastBox.innerHTML = `<p class="error">❌ ${data.error}</p>`;
//       return;
//     }

//     showForecast(data);
//   } catch (err) {
//     forecastBox.innerHTML = `<p class="error">⚠ Forecast not available</p>`;
//   }
// }

// // 📍 Get current location
// function getLocation() {
//   const result = document.getElementById("result");

//   if (!navigator.geolocation) {
//     alert("Geolocation not supported");
//     return;
//   }

//   result.innerHTML = `<p>📍 Detecting location...</p>`;

//   navigator.geolocation.getCurrentPosition(
//     async (pos) => {
//       const lat = pos.coords.latitude;
//       const lon = pos.coords.longitude;

//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6b0186e6d36d7161dffedff6dfd63718&units=metric`,
//         );

//         const data = await res.json();

//         if (data.cod !== 200) {
//           result.innerHTML = `<p class="error">❌ ${data.message}</p>`;
//           return;
//         }

//         showWeather(data);
//         loadForecast(data.name);
//       } catch (err) {
//         result.innerHTML = `<p class="error">⚠ Error getting location weather</p>`;
//       }
//     },
//     () => {
//       result.innerHTML = `<p class="error">❌ Allow location access</p>`;
//     },
//   );
// }

// // 🎨 Show current weather + dynamic background
// function showWeather(data) {
//   const result = document.getElementById("result");

//   // 🌈 Dynamic background
//   const condition = data.weather[0].main.toLowerCase();

//   if (condition.includes("cloud")) {
//     document.body.style.background =
//       "linear-gradient(135deg, #334155, #64748b)";
//   } else if (condition.includes("rain")) {
//     document.body.style.background =
//       "linear-gradient(135deg, #1e293b, #0f172a)";
//   } else if (condition.includes("clear")) {
//     document.body.style.background =
//       "linear-gradient(135deg, #0284c7, #38bdf8)";
//   } else {
//     document.body.style.background =
//       "linear-gradient(135deg, #0f172a, #1e3a8a)";
//   }

//   result.innerHTML = `
//     <div class="weather-card">
//       <h2>${data.name}, ${data.sys.country}</h2>
//       <div class="temp">${Math.round(data.main.temp)}°C</div>
//       <div class="condition">🌥 ${data.weather[0].main}</div>

//       <div class="details">
//         <div class="detail-box">
//           <p>💧 Humidity</p>
//           <h3>${data.main.humidity}%</h3>
//         </div>

//         <div class="detail-box">
//           <p>💨 Wind</p>
//           <h3>${data.wind.speed} m/s</h3>
//         </div>
//       </div>
//     </div>
//   `;
// }

// // 📅 Show 5-day forecast
// function showForecast(data) {
//   const forecastBox = document.getElementById("forecast");

//   const dailyData = data.list.filter((item) =>
//     item.dt_txt.includes("12:00:00"),
//   );

//   let cards = "";

//   dailyData.forEach((day) => {
//     const date = new Date(day.dt_txt);
//     const dayName = date.toLocaleDateString("en-US", {
//       weekday: "short",
//     });

//     cards += `
//       <div class="forecast-card">
//         <h4>${dayName}</h4>
//         <p>🌡 ${Math.round(day.main.temp)}°C</p>
//         <p>${day.weather[0].main}</p>
//       </div>
//     `;
//   });

//   forecastBox.innerHTML = `
//     <h3 class="forecast-title">5-Day Forecast</h3>
//     <div class="forecast-cards">
//       ${cards}
//     </div>
//   `;
// }

// // ⌨️ Enter key support
// document.getElementById("city").addEventListener("keypress", function (e) {
//   if (e.key === "Enter") {
//     getWeather();
//   }
// });
// 🔍 Search weather
async function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Enter city name");
    return;
  }

  await loadWeather(city);
  await loadForecast(city);
}

// 🌤 Load current weather
async function loadWeather(city) {
  const result = document.getElementById("result");
  result.innerHTML = `<p>⏳ Loading...</p>`;

  try {
    const res = await fetch(
      `/weather?city=${encodeURIComponent(city)}`
    );

    const data = await res.json();

    if (data.error) {
      result.innerHTML = `<p class="error">❌ ${data.error}</p>`;
      return;
    }

    showWeather(data);
  } catch (err) {
    result.innerHTML = `<p class="error">⚠ Cannot connect to server</p>`;
  }
}

// 📊 Load forecast
async function loadForecast(city) {
  const forecastBox = document.getElementById("forecast");
  forecastBox.innerHTML = "";

  try {
    const res = await fetch(
      `/forecast?city=${encodeURIComponent(city)}`
    );

    const data = await res.json();

    if (data.error) {
      forecastBox.innerHTML = `<p class="error">❌ ${data.error}</p>`;
      return;
    }

    showForecast(data);
  } catch (err) {
    forecastBox.innerHTML = `<p class="error">⚠ Forecast not available</p>`;
  }
}

// 📍 Get current location
function getLocation() {
  const result = document.getElementById("result");

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  result.innerHTML = `<p>📍 Detecting location...</p>`;

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6b0186e6d36d7161dffedff6dfd63718&units=metric`
        );

        const data = await res.json();

        if (data.cod !== 200) {
          result.innerHTML = `<p class="error">❌ ${data.message}</p>`;
          return;
        }

        showWeather(data);
        loadForecast(data.name);
      } catch (err) {
        result.innerHTML = `<p class="error">⚠ Error getting location weather</p>`;
      }
    },
    () => {
      result.innerHTML = `<p class="error">❌ Allow location access</p>`;
    }
  );
}

// 🎨 Show current weather + dynamic background
function showWeather(data) {
  const result = document.getElementById("result");

  const condition = data.weather[0].main.toLowerCase();

  if (condition.includes("cloud")) {
    document.body.style.background =
      "linear-gradient(135deg, #334155, #64748b)";
  } else if (condition.includes("rain")) {
    document.body.style.background =
      "linear-gradient(135deg, #1e293b, #0f172a)";
  } else if (condition.includes("clear")) {
    document.body.style.background =
      "linear-gradient(135deg, #0284c7, #38bdf8)";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, #0f172a, #1e3a8a)";
  }

  result.innerHTML = `
    <div class="weather-card">
      <h2>${data.name}, ${data.sys.country}</h2>
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <div class="condition">🌥 ${data.weather[0].main}</div>

      <div class="details">
        <div class="detail-box">
          <p>💧 Humidity</p>
          <h3>${data.main.humidity}%</h3>
        </div>

        <div class="detail-box">
          <p>💨 Wind</p>
          <h3>${data.wind.speed} m/s</h3>
        </div>
      </div>
    </div>
  `;
}

// 📅 Show 5-day forecast
function showForecast(data) {
  const forecastBox = document.getElementById("forecast");

  const dailyData = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  let cards = "";

  dailyData.forEach((day) => {
    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    cards += `
      <div class="forecast-card">
        <h4>${dayName}</h4>
        <p>🌡 ${Math.round(day.main.temp)}°C</p>
        <p>${day.weather[0].main}</p>
      </div>
    `;
  });

  forecastBox.innerHTML = `
    <h3 class="forecast-title">5-Day Forecast</h3>
    <div class="forecast-cards">
      ${cards}
    </div>
  `;
}

// ⌨️ Enter key support
document.getElementById("city").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
