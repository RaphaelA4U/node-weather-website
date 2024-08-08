require('dotenv').config()
const request = require('postman-request')

const GEO_API_KEY = process.env.GEO_API_KEY

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${GEO_API_KEY}&limit=1&language=nl`

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Geen verbinding met locatie-services.', undefined)
        } else if (!response.body || !response.body.features || response.body.features.length === 0) {
            callback('Locatie niet gevonden, probeer een andere locatie.', undefined)
        } else {
            const { center: [longitude, latitude], place_name: full_address } = response.body.features[0]
            callback(undefined, { latitude, longitude, full_address })
        }
    })
}

module.exports = geocode