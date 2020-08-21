

$( document ).ready(function() {
    bootStrapCountryDropdown.init();
    virtualKeyboard.init();
   
  
    $("#button-addon2").click((event) => {
        const city = $("#search").val()
        const country = $("#country-select").val()
        event.preventDefault()
        if(country == 'none' || !city ) {
            !city ?  alert('Please choose a city') : alert('Please pick a country')
           
        } else {
            
            localStorage.setItem("city", city);
            localStorage.setItem("country", country);
            console.log(country)
            window.location = $("#button-addon2").attr('href');
    

        }
       

    })
    

   





});