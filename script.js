function getData() {
  const url = "https://restcountries.com/v3.1/all";

  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => displayData(data))
  .catch(error => console.log(error));
}
getData();

function displayData(countries) {
  const root = document.getElementById("root");
  root.innerHTML = " ";
  countries.forEach(country => {
      const { latlng, capital, region, name, area, idd } = country;

      const div = document.createElement("div");
      div.setAttribute("class", "col-sm mt-2 mb-2");
      div.innerHTML = `
      <div class="card" style="width: 20rem;">
      <h5 class="card-title">${name.common}</h5>
      <div class ="image"><img class="card-img-top" src="${country.flags.svg}" alt="Card image cap"></div>
      <div class="card-body">
      <h5 class="card-title">Capital : ${country.hasOwnProperty("capital") ? capital.pop() : "NIL"}</h5>
         <h6 class="card-subtitle mb-2 text-muted">Region : ${region}</h6>
          <p class="card-text"><i class="fa-solid fa-location-dot fa-bounce"></i>Latitute : ${latlng[0]}</p>
          <p class="card-text"><i class="fa-solid fa-location-dot fa-bounce"></i>Longitute : ${latlng[1]}</p>
          <p class="card-text">Area : ${area} </p>
          <p class="card-text">Country Code : ${idd.root} </p>
          <div class="btn btn-primary" onclick="getWeatherData(${latlng[0]}, ${latlng[1]}, '${name.common}')">Click For Weather</div>
      </div>
  </div>

`;
      root.appendChild(div);
  });
}

function getWeatherData(latitude, longitude, cityName) {
  const weatherApiKey = 'b08b08cff96deeade71bc124cbfc9bce';
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;

  fetch(weatherApiUrl)
      .then(response => response.json())
      .then(data => {

        const weatherDescription = data.weather[0].description;
          const temperature = Math.round(data.main.temp - 273.15);
          const humidity = data.main.humidity;
          const wind = data.wind.speed;


          const weatherInfoText = `Country: ${cityName}\nDescription: ${weatherDescription}\nTemperature: ${temperature} °C\nHumidity: ${humidity}%\nWind: ${wind}km/hr`;
          alert(weatherInfoText);
      })
      .catch(error => {
          console.error('Error fetching weather data:', error);
      });
}
