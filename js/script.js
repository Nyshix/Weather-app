const przycisk=document.querySelector('#test');
const cityName=document.querySelector('#city-name');
const temp=document.querySelector('#temperature');
const country=document.querySelector('#country');
const status=document.querySelector('#status');
const pressure=document.querySelector('#pressure');
const icon=document.querySelector('#icon');
const btnFahrenheit = document.querySelector('#btnFahrenheit');
const celsiusTemp = 0;
var lat = 0;
var lon = 0;
getLocation();

function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, error);
    } else {
    alert("Geolokalizcja nie jest wspierana przez twoją przeglądarke.");
    }
        }
    function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    useApi();
    }
    function error(err) {
        swal("Błąd!", "Musisz zezwolić na dostęp do geolokalizacji!", "error")
    }

function useApi() {
fetch(`http://api.openweathermap.org/data/2.5/weather?id=524901&appid=cca7d6e6a896bb7d22e77797b87237cc&lang=pl&units=metric&lat=${lat}&lon=${lon}`)
.then(response => response.json())
.then(response => {
    console.log(response)
    cityName.innerHTML = response.name;
    temp.innerHTML = response.main.temp + " °C";
    country.innerHTML = response.sys.country;
    const celsiusTemp = response.main.temp;
    status.innerHTML = response.weather[0].description;
    pressure.innerHTML ="Ciśnienie : " + response.main.pressure + " hPa";
    icon.src = 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png';
})
};

btnFahrenheit.addEventListener('click', () => {
    const fahrenheit = celsiusTemp * 9 / 5 + 32;
    temp.innerHTML = `${fahrenheit} \xB0F`;
});