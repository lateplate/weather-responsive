$(document).ready(function() {
  $.urlParam = function(name){
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);

    if(results != null) {
      return results[1] || 0;
    } else {
      return null;
    }
  }

  var zipCode = $.urlParam('zip');

  // If zip code is a URL param, override geolocation.
  if(zipCode !== null && zipCode !== '') {
      queryWeatherData(zipCode);
  } else {
    if (navigator.geolocation) {
      var timeoutVal = 30 * 1000;

      navigator.geolocation.getCurrentPosition(
        setQuery,
        displayError,
        { enableHighAccuracy: false, timeout: timeoutVal, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser, showing you sunny Chicago weather instead!");
    }
  }

  function setQuery(position) {
    console.log("Latitutde/longitude: " + position.coords.latitude + "/" + position.coords.longitude);
    queryWeatherData(position.coords.latitude  + ',' + position.coords.longitude);
  }

  function displayError(error) {
    alert("Couldn't get your geolocation, showing you sunny Chicago weather instead!");
    queryWeatherData('60654');
  }

  function queryWeatherData(queryEnd) {
    $.getJSON('proxy.php?url=http://api.wunderground.com/api/593fb0bac5e11e4a/conditions/forecast10day/q/' + queryEnd + '.json', function(json) {
      // Right now conditions
      $('#current-temp').html(json.contents.current_observation.temp_f + '&deg;');
      $('#current-location').html('in ' + json.contents.current_observation.display_location.full);
      $('#current-condition').html(json.contents.current_observation.weather);
      $('#current-icon').removeClass('sunny-rightnow sunny').addClass(json.contents.current_observation.icon);

      // Day 1 conditions
      $('#day-one-name').html(json.contents.forecast.simpleforecast.forecastday[1].date.weekday);
      $('#day-one-temp').html(json.contents.forecast.simpleforecast.forecastday[1].high.fahrenheit + '&deg; / ' + json.contents.forecast.simpleforecast.forecastday[1].low.fahrenheit + '&deg;');
      $('#day-one-conditions').html(json.contents.forecast.simpleforecast.forecastday[1].conditions);
      $('#day-one-icon').removeClass('sunny').addClass(json.contents.forecast.simpleforecast.forecastday[1].skyicon);

      // Day 2 conditions
      $('#day-two-name').html(json.contents.forecast.simpleforecast.forecastday[2].date.weekday);
      $('#day-two-temp').html(json.contents.forecast.simpleforecast.forecastday[2].high.fahrenheit + '&deg; / ' + json.contents.forecast.simpleforecast.forecastday[2].low.fahrenheit + '&deg;');
      $('#day-two-conditions').html(json.contents.forecast.simpleforecast.forecastday[2].conditions);
      $('#day-two-icon').removeClass('sunny').addClass(json.contents.forecast.simpleforecast.forecastday[2].skyicon);

      // Day 3 conditions
      $('#day-three-name').html(json.contents.forecast.simpleforecast.forecastday[3].date.weekday);
      $('#day-three-temp').html(json.contents.forecast.simpleforecast.forecastday[3].high.fahrenheit + '&deg; / ' + json.contents.forecast.simpleforecast.forecastday[3].low.fahrenheit + '&deg;');
      $('#day-three-conditions').html(json.contents.forecast.simpleforecast.forecastday[3].conditions);
      $('#day-three-icon').removeClass('sunny').addClass(json.contents.forecast.simpleforecast.forecastday[3].skyicon);

      // Day 4 conditions
      $('#day-four-name').html(json.contents.forecast.simpleforecast.forecastday[4].date.weekday);
      $('#day-four-temp').html(json.contents.forecast.simpleforecast.forecastday[4].high.fahrenheit + '&deg; / ' + json.contents.forecast.simpleforecast.forecastday[4].low.fahrenheit + '&deg;');
      $('#day-four-conditions').html(json.contents.forecast.simpleforecast.forecastday[4].conditions);
      $('#day-four-icon').removeClass('sunny').addClass(json.contents.forecast.simpleforecast.forecastday[4].skyicon);

      // Day 5 conditions
      $('#day-five-name').html(json.contents.forecast.simpleforecast.forecastday[5].date.weekday);
      $('#day-five-temp').html(json.contents.forecast.simpleforecast.forecastday[5].high.fahrenheit + '&deg; / ' + json.contents.forecast.simpleforecast.forecastday[5].low.fahrenheit + '&deg;');
      $('#day-five-conditions').html(json.contents.forecast.simpleforecast.forecastday[5].conditions);
      $('#day-five-icon').removeClass('sunny').addClass(json.contents.forecast.simpleforecast.forecastday[5].skyicon);
    });
  }
});