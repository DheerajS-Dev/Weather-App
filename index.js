// const apiKey = `37ea2dbb39328aaa0fa3cc1d43820c48` ;
// let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;     // Sesrch By CityName...
// let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;    // Search by Latitude and Longitude or Use for Current Location...
// let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;    // Search Forcast

async function getData(lat, lon) {
  let city = document.getElementById("city").value;

  //  let apiKey = `c32ed89b55074ca89fb195229220106` ;

  if (city !== "") {
    var url = `https://api.weatherapi.com/v1/forecast.json?key=c32ed89b55074ca89fb195229220106&q=${city}&days=7&aqi=yes`;
  } else {
    var url = `https://api.weatherapi.com/v1/forecast.json?key=c32ed89b55074ca89fb195229220106&q=${city}&days=7&aqi=yes&q=${lat},${lon}`;
  }

  let response = await fetch(url);

  let res = await response.json();

  appendData(res);
  // console.log(res) ;
}

function appendData(data) {
  let container = document.getElementById("forecasts");

  document.getElementById("cWeather").innerText = `CURRENT WEATHER`;

  document.getElementById("time").innerText = `${data.location.localtime}`;

  document.getElementById(
    "name"
  ).innerText = `${data.location.name},${data.location.region},${data.location.country}`;

  document.getElementById("temp").innerHTML = `${Math.floor(
    data.current.temp_c
  )}<span id="celcius">°C</span`;

  document.getElementById(
    "feelsLike"
  ).innerHTML = `FEELS LIKE <span >${Math.floor(
    data.current.feelslike_c
  )}°C</span>`;

  document.getElementById("main").innerText = `${data.current.condition.text}`;

  document.getElementById("weather").src = `${data.current.condition.icon}`;

  document.getElementById(
    "minMax"
  ).innerHTML = `<span>Min Temperature - ${data.forecast.forecastday[0].day.mintemp_c}°C</span>
                                                  <span>Max Temperature - ${data.forecast.forecastday[0].day.maxtemp_c}°C</span>`;

  document.getElementById(
    "riseSet"
  ).innerHTML = `<span>Sunrise - ${data.forecast.forecastday[0].astro.sunrise}</span>
                                                   <span>Sunset - ${data.forecast.forecastday[0].astro.sunset}</span>`;

  document.getElementById("wind").innerHTML = `<div>WIND</div>
                                                <div>${data.current.wind_kph} km/h</div>`;
  document.getElementById("humidity").innerHTML = `<div>HUMIDITY</div>
                                                   <div>${data.current.humidity}%</div>`;
  document.getElementById("visibility").innerHTML = `<div>VISIBILITY</div>
                                                    <div>${data.current.vis_km}km</div>`;
  document.getElementById("pressure").innerHTML = `<div>PRESSURE</div>
                                                   <div>${data.current.pressure_mb}mb</div>`;
  document.getElementById("dewPoint").innerHTML = `<div>DEW POINT</div>
                                                <div>${data.forecast.forecastday[0].hour[0].dewpoint_c}°C</div>`;

  let iframe = document.getElementById("gmap_canvas");
  iframe.src = `https://maps.google.com/maps?q=${data.location.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  let forecast = data.forecast.forecastday;

  document.getElementById(
    "forecast"
  ).innerText = `${forecast.length} DAYS FORECAST`;

  document.getElementById("forecasts").innerHTML = null;

  forecast.forEach(function (element) {
    const div = document.createElement("div");
    div.setAttribute("id", "card");

    div.innerHTML = `
            <h4>${element.date}</h4>
            <img src="${element.day.condition.icon}" alt="">
            <h4>${element.day.maxtemp_c}°C</h4>
            <p>${element.day.mintemp_c}°C</p>  
        `;

    container.append(div);
  });
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(success);

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getData(lat, lon);
  }
}

getLocationWeather();
