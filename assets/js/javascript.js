// VARIABLES FOR SEARCH SECTION TOGGLE
var searchButton = $("#toggle");
var asideSec = $("aside");
var cityData = $("#cityData");

// SEARCH SECTION TOGGLE FU
searchButton.click(function() {
    if(asideSec.css("display") == "none") {
        asideSec.css({"display" : "block", "width" : "100vh" , "height" : "200px" , "overflow" : "auto"});
        cityData.css({"margin-top" : "210px"});
    } else {
        asideSec.css({"display" : "none"});
        cityData.css({"margin-top" : "10px"});
    }
})

// var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
// var APIKey = "9c4d817dd15f5df6514334a9cf6c9abe";

// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
