var callURL = 'https://api.openweathermap.org/data/2.5/onecall?';
var weatherApiKey = 'ef12b5f4e798bb5ad220df1a4b59e2ea'
var geoCodeURL = 'http://open.mapquestapi.com/geocoding/v1/address?'
var geoApiKey = '2b0LejmnC5jZy2alWDbvDFbKd9oUIZy3';
var searchButton = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('previousSearch'))



function epochToDate(epochTime) {
    var myDate = new Date(epochTime * 1000);
    var day = myDate.getDate();
    var month = myDate.getMonth();
    var year = myDate.getFullYear();
    return day + "/" + (month + 1) + "/" + year;
}

function saveCityToHistory(cityName) {
    $('#history').append('<button class=\"historybutton btn btn-secondary\">' + cityName + '</button>');
    if (searchHistory == null) {
        searchHistory = []
    }
    searchHistory.push(cityName);
    localStorage.setItem('previousSearch', JSON.stringify(searchHistory));
}

function getGeoData(cityName) {
    saveCityToHistory(cityName);

    fetch(geoCodeURL + 'key=' + geoApiKey + '&location=' + cityName)
        .then(function(response) {
            return response.json();
        })
        .then(function(geoCode) {
            var latitude = geoCode.results[0].locations[0].latLng.lat;
            var longitude = geoCode.results[0].locations[0].latLng.lng;
            console.log(latitude + ' ' + longitude)
            fetch(callURL + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherApiKey + '&units=imperial')
                .then(function(response) {
                    return response.json();
                })
                .then(function(weather) {
                    console.log(weather);
                    for (i = 0; i <= 4; i++) {
                        var date = $('#date' + i);
                        var temp = $('#temp' + i);
                        var wind = $('#wind' + i);
                        var humidity = $('#humidity' + i);
                        var uv = $('#uv' + i);
                        date.text(epochToDate(weather.daily[i].dt));
                        temp.text('Temp: ' + weather.daily[i].temp.day);
                        wind.text('Wind: ' + weather.daily[i].wind_speed);
                        humidity.text('Humidity: ' + weather.daily[i].humidity);
                        uv.text('UV Index: ' + weather.daily[i].uvi);
                    }
                    var cityDate = $('#city_date');
                    var tempCurrent = $('#tempCurrent');
                    var windCurrent = $('#windCurrent');
                    var humidityCurrent = $('#humidityCurrent');
                    var uvCurrent = $('#uvCurrent');
                    cityDate.text(cityName + ' ' + epochToDate(weather.current.dt));
                    tempCurrent.text('Temp: ' + weather.current.temp);
                    windCurrent.text('Wind: ' + weather.current.wind_speed);
                    humidityCurrent.text('Humidity: ' + weather.current.humidity);
                    uvCurrent.text('UV Index: ' + weather.current.uvi);
                })
        })
}

function onLoad() {
    if (searchHistory != null) {
        for (i = 0; i < searchHistory.length; i++) {
            let cityName = searchHistory[i];
            $('#history').append('<button id=' + cityName + ' class=\"historybutton btn btn-secondary\">' + cityName + '</button>');
            document.getElementById(cityName).onclick = function() {
                getGeoData(cityName)
            }
        }
    }
}

function getGeoDataBySearch() {
    var cityName = $('#search').val();
    getGeoData(cityName)
}


onLoad()
searchButton.addEventListener('click', getGeoDataBySearch);