const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Raphael Rustema',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Raphael',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Hallo, dit is de hulp-pagina.',
        name: 'Raphael',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Je moet een adres opgeven.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, full_address } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, { temp, feels_like, temp_min, temp_max, weather_description } = {}) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                weer: weather_description,
                temperatuur: temp,
                gevoels_temperatuur: feels_like,
                minimum_temperatuur: temp_min,
                maximum_temperatuur: temp_max,
                locatie: full_address,
                adres: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Je moet een zoekterm opgeven.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not found',
        errorMsg: 'Help artikel niet gevonden.',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not found',
        errorMsg: 'Pagina niet gevonden.',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})