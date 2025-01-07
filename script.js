let cityName;

let temp = document.querySelector(".temp");
let desc = document.querySelector(".desc");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind-speed");
let city = document.querySelector(".city-name");
let bg = document.querySelector("body");

function checkWeather() {
  cityName = document.querySelector(".city-name-input").value;

  if (cityName === "") {
    return alert("Enter city name");
  } else {
    fetchWeather(cityName);
  }

  document.querySelector(".city-name-input").value = "";
}

function fetchWeather(city) {
  const apiKey = "bf161bc1b393b35a20cde69097f1155f";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("city not found!");
      } else {
        return response.json();
      }
    })
    .then((value) => {
      weatherResult(value);
    })
    .catch((err) => {
      console.error(err);
      alert(err);
    });
}

function weatherIdCheck(id) {
  if (id >= 200 && id <= 232) {
    bg.style.backgroundImage = "url(./assets/thunder.webp)";
  } else if (id >= 300 && id < 322) {
    bg.style.backgroundImage = "url(./assets/drizzle.jpg)";
  } else if (id >= 500 && id < 531) {
    bg.style.backgroundImage = "url(./assets/rainy.jpg)";
  } else if (id >= 600 && id < 622) {
    bg.style.backgroundImage = "url(./assets/snowy.jpg)";
  } else if (id > 700 && id < 782) {
    bg.style.backgroundImage = "url(./assets/foggy.jpg)";
  } else if (id == "800") {
    bg.style.backgroundImage = "url(./assets/clear-sky.jpg)";
  } else if (id > 800 && id <= 804) {
    bg.style.backgroundImage = "url(./assets/cloudy.jpg)";
  }
}

function weatherResult(value) {
  document.querySelector(".city-name").innerHTML = value.name;
  console.log(value);
  temp.innerHTML = `${value.main.temp}<sup>o</sup>C`;
  desc.innerText = value.weather[0].description;
  humidity.innerText = value.main.humidity;
  wind.innerText = `${value.wind.speed} m/s`;
  let id = value.weather[0].id;
  console.log(id);

  weatherIdCheck(id);
}
