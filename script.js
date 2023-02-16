const citiesList = [{
    id: 703448, name: 'Kyiv'
}, {
    "id": 702550, "name": "Lviv"
}, {
    "id": 698740, "name": "Odessa"
}, {
    "id": 706483, "name": "Kharkiv"
}, {
    "id": 703845, "name": "Kryvyi Rih"
}]
const cityImagesMap = {
    703448: 'kyiv', 702550: 'lviv4', 698740: 'odesa', 706483: 'kharkiv', 703845: 'kryvyirih',
}

const fetchWeather = id => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&.34&appid=148beffd1e6d06bd727c5b6f44611dbd`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {

            document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
            document.querySelector('.temperature').innerHTML =
                `temperature : ${Math.round(data.main.temp - 273)}&deg`;
            document.querySelector('.description').innerHTML = `${data.weather[0]
            ['description']}`;
            document.querySelector('.wind__direction').innerHTML = `wind direction : ${data.wind.deg}`;
            document.querySelector('.wind__speed').innerHTML = `wind speed : ${data.wind.speed} m/s`;
            document.querySelector('.pressure').innerHTML = `pressure : ${data.main.pressure} millibars`;
            const cityImage = document.getElementById('city-image')
            cityImage.src = `${cityImagesMap[id]}.jpg`
        })
        .catch(function (error) {
            console.error(error)
        });
}
const createOptionElement = ({ id, name }) => {
    const element = document.createElement('option')
    element.innerText = name
    element.value = id
    return element
}

const citiesDropdown = document.getElementById('cities-dropdown')
citiesList.forEach(city => {
    const option = createOptionElement(city)
    citiesDropdown.appendChild(option)
})

const fetchCurrentWeather = () => {
    const cityId = citiesDropdown[citiesDropdown.selectedIndex].value
    fetchWeather(cityId)
}

fetchCurrentWeather()

citiesDropdown.oninput = fetchCurrentWeather





