const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2FtZXBpZXJhZmEiLCJhIjoiY2x6Y2c1bG0yMGJsdzJqczh6b2NmZmF1aiJ9.rHYrHKkvUS3XIBQJdBzT2w&limit=1&language=nl`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Geen verbinding met locatie-services.', undefined)
        } else if (body.features.length === 0) {
            callback('Locatie niet gevonden, probeer een andere locatie.', undefined)
        } else {
            const { center: [longitude, latitude], place_name: full_address } = body.features[0]
            callback(undefined, { latitude, longitude, full_address })
        }
    })
}

module.exports = geocode