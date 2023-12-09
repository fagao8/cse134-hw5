const endpoint = "https://api.weather.gov/gridpoints/SGX/56,21/forecast/hourly"

const widget = document.querySelector("weather-widget")
const msg = document.querySelector("p")
const temp =  document.createElement("span")
const condition = document.createElement("span")
const wind = document.createElement("span")
const humidity = document.createElement("span")
const root = document.documentElement;
const container = document.createElement("div")

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        const weather = data.properties.periods[0]
        console.log(data)
        temp.innerHTML = `${weather.temperature}&deg;${weather.temperatureUnit}`;
        condition.innerHTML = weather.shortForecast;
        wind.innerHTML = `<span>Wind</span><br>${weather.windSpeed} ${weather.windDirection}`
        humidity.innerHTML = `<span>Humidity</span><br>${weather.relativeHumidity.value}%`
        if (!weather.isDayTime) {
            root.style.setProperty("--text-color", "#EEEEEE")
            const text = document.querySelectorAll("weather-widget *")
            text.forEach(elem => {
                elem.style.textShadow = "0px 0px 2px black"
            })
        }
        fetch(weather.icon.replace(",0", "")).then(response => response.blob())
        .then(img => {
            const imageUrl = URL.createObjectURL(img);
            widget.style.backgroundImage = `url(${imageUrl})`;
            widget.style.backgroundSize = "cover";
            widget.style.width = "250px"
            widget.style.height = "150px"
        })
        msg.style.display = "none";
        temp.style.fontSize = "36px"
        temp.style.alignSelf = "flex-start"
        container.style.display = "flex";
        container.style.justifyContent = "space-between";
        container.style.alignSelf = "flex-start"
        container.style.width = "100%";
        const smallText = document.querySelectorAll("span span")
        smallText.forEach(elem => {
            elem.style.opacity = "70%"
            elem.style.fontSize = "14px"
        })
    })
    .catch(error => console.error('Error fetching weather data:', error));

widget.appendChild(temp)
widget.appendChild(condition)
widget.appendChild(container)
container.appendChild(wind)
container.appendChild(humidity)