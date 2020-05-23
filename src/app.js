const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express Config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handle bars Engine and views location
app.set('view engine', 'hbs')

//This is done to name the folder for views as desired,
//else the folder should be named as view, but templates.
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Serving static pages
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
      helpText: 'This is something Helpful',
      title: 'Help',
      name: 'Andrew Mead'    
    })
})

//Routes Section

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You Must Provide An Address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'Provide Search Term'
        })
    }
    res.send({
        products: []
    })
})

//Should be placed at last.
//As nothing matched for a requested page

app.get('/help/*', (req, res) => {
    //res.send('No Help')
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page Not Found'
    })
})


//Starting Server

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})