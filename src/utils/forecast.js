const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b331dc790c14d63d52b9cbcb18138b12&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body } = {}) =>{
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.error) {
            callback('Something went wrong.', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + '.')
        }
    })
}


module.exports = forecast