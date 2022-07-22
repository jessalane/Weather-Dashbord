// VARIABLES FOR SEARCH SECTION TOGGLE
var searchButton = $("#toggle");
var asideSec = $("aside");
var cityData = $("#cityData");

// SEARCH SECTION TOGGLE FUNCTION
searchButton.click(function() {
    if(asideSec.css("display") == "none") {
        asideSec.css({"display" : "block", "width" : "100vh" , "height" : "200px" , "overflow" : "auto"});
        cityData.css({"margin-top" : "210px"});
    } else {
        asideSec.css({"display" : "none"});
        cityData.css({"margin-top" : "10px"});
    }
})

// CAPTURING THE SEARCH SUBMISSION INPUT
var searchSub = $("#searchSub");

// CREATING A FUNCTION TO POPULATE THE API URL ON SUBMISSION
searchSub.click(function(event) {
    // LOCAL VARIABLES
    var city = $("#searchCity").val();

    // MY API KEY AND THE URL
    var APIKey = "9c4d817dd15f5df6514334a9cf6c9abe";
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lang=en&q=" + city + "&appid=" + APIKey;
    
    // PREVENTS THE DEFAULT CLEARING
    event.preventDefault();

    // FETCHING THE API URL
    fetch(weatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        // DATA DAILY VARIABLES
        var cityName = data.name;
        var cityTemp = data.main.temp;
        var cityWind = data.wind.speed;
        var cityHumid = data.main.humidity;

        // ADDING DATA TO CITY WEATHER SECTION
        $("#nameTitle").text(cityName + "(moment/date)");
        $("#temp").text("Temp: " + cityTemp + "°F");
        $("#wind").text("Wind: " + cityWind + "MPH");
        $("#humidity").text("Humidity: " + cityHumid + "%");
        // $("#uv").text("UV Index: " + cityUV);

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

            // DATA UVI VARIABLES
            var cityUV = data.current.uvi;

            // ADDING DATA TO WEEKLY FORECAST SECTION
            $("#uv").text("UV Index: " + cityUV);

            // LOOPING THE DAILY FORECAST
            for(i = 0; i < 5; i++) {

                // DATA VARIABLES FOR WEEKLY FORECAST
                var dailyTemp = data.daily[i].temp.max;
                var dailyWind = data.daily[i].wind_speed;
                var dailyHumid = data.daily[i].humidity;

                $("#" + i).children("h4").html("insert date");
                $("#" + i).children(".temp").html("Temp: " + dailyTemp + "°F");
                $("#" + i).children(".wind").html("Wind: " + dailyWind + "MPH");
                $("#" + i).children(".humidity").html("Humidity: " + dailyHumid + "%");
            }

        })
    })
})