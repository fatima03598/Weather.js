const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const getDay = (unix) => {
    let date = new Date(unix*1000)
    return days[date.getDay()]
}


$( document ).ready(function() {
    const city = localStorage.getItem('city')
    const country = localStorage.getItem('country')
 
    $.ajax({
        url: `https://api.weatherbit.io/v2.0/forecast/daily?city=${city+","+country}&days=5&key=${WEATHER_API_KEY}`,
        type: 'GET'})
      .done( (response) => {
         if(!response){
          window.location.href = "./404.html";
        
          } else {
                    response.data.forEach(day => {
                        const weatherDiv= document.createElement('div')
                        weatherDiv.classList.add("forecast-weather")
                        $(`<h2>${getDay(day.moonrise_ts)}</h2><br>`).appendTo(weatherDiv);
                        $(`<section class="temperatures"> <h6>${day.high_temp}°C  </h6>  |  <h6>  ${day.app_min_temp}°C</h6> </section><br>`).appendTo(weatherDiv)
                        $(`<img  src="https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png" alt="weather icon" /><br>`).appendTo(weatherDiv)
                        $(`<h5>${day.weather.description}</h5>`).appendTo(weatherDiv)
                        $(weatherDiv).appendTo("#forecast")
                        $.ajax({
                            url: `https://api.unsplash.com/search/photos?page=1&query=${city+","+country}&client_id=${UNSPLASH_API_KEY}`,
                            type: 'GET'})
                        .done( (response) => {
                            if(!response){
                                $(`<h1>${city}</h1>`).appendTo("#city-cover")
                            
                            } else {
                                const url = response.results[0].urls.raw
                                $(`<img  src="${url}" alt="weather cover" />`).appendTo("#city-cover")
                                $(`<h1>${city}</h1>`).appendTo("#city-cover")
                                
                            }
                        })
                        
                        
                    })
    }
      })
      .fail( function(msg) {
        window.location.href = "./404.html";
    })
    







 
  
   



});