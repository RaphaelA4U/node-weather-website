require('dotenv').config()
const request = require('postman-request')

const FORECAST_API_KEY = process.env.FORECAST_API_KEY

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=nl&appid=${FORECAST_API_KEY}&units=metric`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Geen verbinding met weer-services.', undefined)
        } else if (body.cod !== 200) {
            callback('Locatie niet gevonden, probeer een andere locatie.', undefined)
        } else if (!body.weather || body.weather.length === 0) {
            callback('Weer informatie niet beschikbaar.', undefined)
        } else {
            const weather_description = body.weather[0].description
            const { temp, feels_like, temp_min, temp_max } = body.main
            callback(undefined, { temp, feels_like, temp_min, temp_max, weather_description })
        }
    })
}

module.exports = forecast