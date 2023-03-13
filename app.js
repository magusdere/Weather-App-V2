// Variables

const apiKey = "7a0619da33830445956d51d48335ddab";

const form = document.querySelector('form');
const input = document.querySelector('#city-input');
const weatherContainer = document.querySelector('#weather-info');
const weatherTemplate = document.querySelector('#weather-template');
const errorTemplate = document.querySelector('#error-template');
const fragment = document.createDocumentFragment();
const cityName = document.querySelector("#city-name");

// Function to show data

const showData = (data) => {
  
  const iconCode = data.weather[0].icon;

  const clone = weatherTemplate.content.cloneNode(true);
  clone.querySelector("#temperature").textContent = data.main.temp;
  clone.querySelector("#description").textContent = data.weather[0].description;
  clone.querySelector("#city-name").textContent = input.value;
  clone.querySelector("#pressure").textContent = data.main.pressure;
  clone.querySelector("#humidity").textContent = data.main.humidity;
  clone.querySelector("#feels-like").textContent = data.main.feels_like;
  clone.querySelector("#wind").textContent = data.wind.speed;
  clone.querySelector("#icon").src = `https://openweathermap.org/img/wn/${iconCode}.png`;
  fragment.appendChild(clone);

  weatherContainer.textContent = "";
  weatherContainer.appendChild(fragment);
}

// Function to show error message

const showError  = () => {
  const clone = errorTemplate.content.cloneNode(true);
  clone.querySelector("#error-message").textContent = "City not found, try again";
  fragment.appendChild(clone);

  weatherContainer.textContent = "";
  weatherContainer.appendChild(fragment);
}

// API call

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    showData(data);
  } catch {
    showError();
  }
});