const request = require('request');

const geoCode = (address, callback) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hpdnAxMDIiLCJhIjoiY2s4ZWc4dGVvMTVuZzNyb2Fpdzk5NDVmNCJ9.5AbqhziCNRL2jkG5Jn010Q&limit=1'

    request({ url: mapUrl, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length < 1) {
            callback('Unable to find location', undefined);
        } else {
            const features = body.features[0];
            const latitude = features.center[1];
            const longitude = features.center[0];
            const location = features.place_name

            callback(undefined, {
                latitude, 
                longitude,
                location
            })

        }
    })

}

module.exports = geoCode;
