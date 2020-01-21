const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia2JxdGVjaHdvcmxkIiwiYSI6ImNrNTJkcWNyeDBsYjQza21yZHBzMnZiazMifQ.1rFcmDHZPUYCJ661XW4_bA&limit=1'
    // Make a request from the API
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the serivices!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location, Try another search!!!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;
