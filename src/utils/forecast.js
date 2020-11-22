const request = require('request');

const forecast = (lat, log, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=90297e94e4535e0e700955bf0c5bf404&query='+lat+','+log+'&units=f'

    request({url, json: true }, (error, {body}) => {
        if(error) {
            callback('Low level issue', undefined)
        } else if (lat.length < 1 || log.length < 1) {
            callback('Invalid inputs', undefined)
        } else {
            const forecast=  body.current.weather_descriptions[0];
            const temp = body.current.temperature;
            const feelsLike = body.current.feelslike;
            callback(undefined, forecast + 'The current temperature is ' +temp + 'F. It feels like '+feelsLike+' F');
        }

    })

}

module.exports = forecast;