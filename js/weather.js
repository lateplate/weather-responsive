$(document).ready(function() {

            $.urlParam = function(name){
                var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);

                if(results != null) {
                    return results[1] || 0;
                } else {
                    return null;
                }
            }

            var zipCode = $.urlParam('zip_code');
            var jsonDataSource = 'weather-data.json';
            
            if(zipCode != null && zipCode != '') {
                jsonDataSource = 'proxy.php?url=http://api.wunderground.com/api/593fb0bac5e11e4a/conditions/forecast10day/q/' + zipCode + '.json';
            }
            
            $.getJSON(jsonDataSource, function(json) {
                    // Right now conditions
                    $('#current-temp').html(json.contents.current_observation.temp_f + '&deg;');
                    $('#current-location').html('in ' + json.contents.current_observation.display_location.full);
                    $('#current-condition').html(json.contents.current_observation.weather);
                    $('#day-one-icon').removeClass('sunny').addClass(json.contents.current_observation.icon);

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
        });