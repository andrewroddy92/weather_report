var callURL = 'https://api.openweathermap.org/data/2.5/onecall?';
var weatherApiKey = 'ef12b5f4e798bb5ad220df1a4b59e2ea'
var geoCodeURL = 'http://api.positionstack.com/v1/forward?';
var geoApiKey = 'd806522031ecdf366b9d5f19da626943';
var searchButton = document.getElementById('search-button');

function getGeoData() {
    var cityName = $('#search').val();
    fetch(geoCodeURL + 'access_key=' + geoApiKey + '&query=' + cityName)
        .then(function (response) {
            return response.json();
        })
        .then( function (geoCode) {
            var latitude = geoCode.data[0].latitude;
            var longitude = geoCode.data[0].longitude;
            console.log(latitude + ' ' + longitude)
            fetch(callURL + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherApiKey)
                .then(function (response) {
                    return response.json();
                })
                .then(function (weather) {
                    console.log(weather);
                })
        })
    
}

searchButton.addEventListener('click', getGeoData);