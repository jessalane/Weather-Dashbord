// VARIABLES FOR SEARCH SECTION TOGGLE
var searchButton = $("#toggle");
var asideSec = $("aside");
var cityData = $("#cityData");

// SEARCH SECTION TOGGLE FUNCTION
searchButton.click(function () {
    if (asideSec.css("display") == "none") {
        asideSec.css({
            "display": "block"
        });
        cityData.css({
            "margin-top": "210px"
        });
    } else {
        asideSec.css({
            "display": "none"
        });
        cityData.css({
            "margin-top": "10px"
        });
    }
})

// PULLING VARIABLES FROM LOCAL, AND PUTTING INTO A BUTTON
var pulledSearches = window.localStorage.getItem("storedSearch");
var splitSearches = pulledSearches.split(',');
for (var i = 0; i < splitSearches.length; i++) {
    $("hr").append("<button type=\"submit\" form=\"searchForm\" value=\"" + splitSearches[i] + "\">" + splitSearches[i] + "</button>");
}

// CAPTURING THE SEARCH SUBMISSION INPUT
var searchSub = $("#searchSub");

// CREATING A FUNCTION TO POPULATE THE API URL ON SUBMISSION
searchSub.click(function (event) {
    // LOCAL VARIABLES
    var city = $("#searchCity").val();
    
    if (city == null) {
        $("button").click(function() {
            city = $(this).text();
        });
    }

    // MY API KEY AND THE URL
    var APIKey = "9c4d817dd15f5df6514334a9cf6c9abe";
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lang=en&q=" + city + "&appid=" + APIKey;

    // PREVENTS THE DEFAULT CLEARING
    event.preventDefault();

    var storedSearch = localStorage.getItem("storedSearch");
    var newSearch = document.querySelector("#searchCity").value;

    if (storedSearch == null) {
        storedSearch = [];
        var storedSearch = document.querySelector("#searchCity").value;

        localStorage.setItem("storedSearch", storedSearch.toString());

    } else {
        storedSearch = storedSearch ? storedSearch.split(",") : [];

        storedSearch.push(newSearch);
        localStorage.setItem("storedSearch", storedSearch.toString());
    }

    // FETCHING THE API URL
    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // DATA DAILY VARIABLES
            var cityName = data.name;
            var cityIcon = data.weather[0].icon;
            var cityTemp = data.main.temp;
            var cityWind = data.wind.speed;
            var cityHumid = data.main.humidity;
            var dateToday = moment().format('L');

            // ADDING DATA TO CITY WEATHER SECTION
            $("#temp").text("Temp: " + cityTemp + " °F");
            $("#wind").text("Wind: " + cityWind + " MPH");
            $("#humidity").text("Humidity: " + cityHumid + "%");
            $("#nameTitle").text(cityName + " (" + dateToday + ")");
            $("#nameTitle").after(" <img src='http://openweathermap.org/img/wn/" + cityIcon + ".png'>");

            // LON AND LAT VARIABLES
            var cityLon = data.coord.lon;
            var cityLat = data.coord.lat;

            // URL TO SEARCH BY LONG AND LAT
            var coordUrl = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lang=en&lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;

            // FETCHING LON/LAT API URL
            fetch(coordUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    // DATA LAT/LONG SEARCH VARIABLES
                    var cityUV = data.current.uvi;

                    // ADDING UV INDEX TO THE CITY DATA SECTION
                    $("#uv").text("UV Index: " + cityUV);

                    // LOOPING THE WEEKLY FORECAST
                    for (i = 0; i < 5; i++) {

                        // DATA VARIABLES FOR WEEKLY FORECAST
                        var dailyTemp = data.daily[i].temp.max;
                        var dailyIcon = data.daily[i].weather[0].icon;
                        var dailyWind = data.daily[i].wind_speed;
                        var dailyHumid = data.daily[i].humidity;
                        var dateAdd = moment().add(i + 1, 'days').format('L');

                        $("#" + i).children("h4").html(dateAdd);
                        $("#" + i).children(".weatherIcon").html("<img src='http://openweathermap.org/img/wn/" + dailyIcon + ".png'>");
                        $("#" + i).children(".temp").html("Temp: " + dailyTemp + " °F");
                        $("#" + i).children(".wind").html("Wind: " + dailyWind + " MPH");
                        $("#" + i).children(".humidity").html("Humidity: " + dailyHumid + "%");

                    }

                })
        })
})