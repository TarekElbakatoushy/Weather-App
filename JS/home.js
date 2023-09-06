let searchInput = document.getElementById("search");
let cityName = document.getElementById("name");


// Date setUP
let Month = document.getElementById("month");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();
let month = months[d.getMonth()];
let day = days[d.getDay()];
Month.innerHTML = d.getDate() + " " + month;
document.getElementById("day").innerHTML = day;
document.getElementById("tomorrow").innerHTML = days[d.getDay()+1];;
document.getElementById("after-tomorrow").innerHTML = days[d.getDay()+2];;

// Get User Location
let userLocation = navigator.geolocation;
function myGeolocator() {
  if (userLocation) {
    userLocation.getCurrentPosition(success);
  }
}

function success(data) {
  let lat = data.coords.latitude;
  let long = data.coords.longitude;
  let location = new XMLHttpRequest()
  location.open("GET", `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}`)
  location.send()
  location.addEventListener("loadend", function () {
    let locationData = JSON.parse(location.response)
    document.getElementById("name").innerHTML = locationData.address.city
   displayWeather();
  })

}

  
myGeolocator();

// Display UserLocation Weather Data
  
async function displayWeather() {
      let http =  await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=e9184a7371634291b0d210642232108&q=${cityName.innerHTML}&days=3`
      );
              let Data = await http.json();
            document.getElementById("temp").innerHTML =
     Data.current.temp_c + "°C";
     document.getElementById("condition").innerHTML =
       Data.current.condition.text;
     document
       .getElementById("icon-one")
     .setAttribute("src", `http:${Data.current.condition.icon}`);
     document.getElementById("temp-two-high").innerHTML =
       Data.forecast.forecastday[1].day.maxtemp_c + "°C";
     document.getElementById("temp-two-low").innerHTML =
       Data.forecast.forecastday[1].day.mintemp_c + "°C";
     document
       .getElementById("icon-two")
       .setAttribute(
         "src",
         `http:${Data.forecast.forecastday[1].day.condition.icon}`
       );
     document.getElementById("condtion-two").innerHTML =
       Data.forecast.forecastday[1].day.condition.text;
     document
       .getElementById("icon-three")
       .setAttribute(
         "src",
         `http:${Data.forecast.forecastday[2].day.condition.icon}`
       );
     document.getElementById("temp-high-three").innerHTML =
       Data.forecast.forecastday[2].day.maxtemp_c + "°C";
     document.getElementById("temp-low-three").innerHTML =
       Data.forecast.forecastday[2].day.mintemp_c + "°C";
     document.getElementById("condition-3").innerHTML =
     Data.forecast.forecastday[2].day.condition.text;
         document.getElementById("humidity").innerHTML = Data.current.humidity + "%";
      document.getElementById("speed").innerHTML = Data.current.wind_kph + "km/hr"
      document.getElementById("direction").innerHTML =
        Data.current.wind_dir;
    }
          
// Weather Search & Display Data
async function search() {
  var https =  await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=e9184a7371634291b0d210642232108&q=${searchInput.value}&days=3`
          );
  var Data = await https.json();
  console.log(Data)
      document.getElementById("name").innerHTML = Data.location.name;
  document.getElementById("temp").innerHTML = Data.current.temp_c + "°C";
  document.getElementById("condition").innerHTML = Data.current.condition.text;
  document.getElementById("icon-one").setAttribute
    ("src", `http:${Data.current.condition.icon}`);
  document.getElementById("temp-two-high").innerHTML =
    Data.forecast.forecastday[1].day.maxtemp_c + "°C";
  document.getElementById("temp-two-low").innerHTML =
    Data.forecast.forecastday[1].day.mintemp_c + "°C";
    document
      .getElementById("icon-two")
      .setAttribute(
        "src",
        `http:${Data.forecast.forecastday[1].day.condition.icon}`
  );
  document.getElementById("condtion-two").innerHTML =
    Data.forecast.forecastday[1].day.condition.text;
  document
    .getElementById("icon-three")
    .setAttribute(
      "src",
      `http:${Data.forecast.forecastday[2].day.condition.icon}`
  );
    document.getElementById("temp-high-three").innerHTML =
      Data.forecast.forecastday[2].day.maxtemp_c + "°C";
    document.getElementById("temp-low-three").innerHTML =
    Data.forecast.forecastday[2].day.mintemp_c + "°C";
    document.getElementById("condition-3").innerHTML =
    Data.forecast.forecastday[2].day.condition.text;
      document.getElementById("humidity").innerHTML = Data.current.humidity + "%";
      document.getElementById("speed").innerHTML = Data.current.wind_kph + "km/hr"
      document.getElementById("direction").innerHTML =
        Data.current.wind_dir;
}
//add active class to targeted nav link
let links = document.querySelectorAll("nav a")
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    document.querySelector("nav a.active")?.classList.remove("active");
    e.target.classList.add("active");
  });
});