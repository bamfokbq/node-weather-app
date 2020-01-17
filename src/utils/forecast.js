const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/428311c5b1514e9953f418040e9f6dcf/' + latitude + ',' + longitude + '?units=si';
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback("Can\'t access the server!", undefined);
        } else if (body.error) {
            callback("Can\'t access the coordinate!!!, try again.")
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast;