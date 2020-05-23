const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3VuYWxrcCIsImEiOiJja2FkamMyNTkwOTdqMnhtdGhuenZ6cDUwIn0.cbEQ2IINBU25nD-s4UJu2A&limit=1'
    request({url, json: true}, (error, {body} = {}) => {
        
        if(error){
            callback('Unable to connect to location services.', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another service', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}



module.exports = geocode