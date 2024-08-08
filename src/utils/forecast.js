require('dotenv').config()
const FORECAST_API_KEY = process.env.FORECAST_API_KEY

const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=nl&appid=${FORECAST_API_KEY}&units=metric`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Geen verbinding met weer-services.', undefined)
        } else if (body.error) {
            callback('Locatie niet gevonden, probeer een andere locatie.', undefined)
        } else {
            const weather_description = body.weather[0].description
            const { temp, feels_like, temp_min, temp_max } = body.main
            callback(undefined, { temp, feels_like, temp_min, temp_max, weather_description })
        }
    })
}

module.exports = forecast