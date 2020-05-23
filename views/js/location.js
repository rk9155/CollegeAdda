function getCoordintes() { 
    var options = { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0 
    }; 

    function success(pos) { 
        var crd = pos.coords; 
        var lat = crd.latitude.toString(); 
        var lng = crd.longitude.toString(); 
        var coordinates = [lat, lng]; 
        getCity(coordinates); 
        return; 

    } 

    function error(err) { 
        console.warn(`ERROR(${err.code}): ${err.message}`); 
    } 

    navigator.geolocation.getCurrentPosition(success, error, options); 
} 

function getCity(coordinates) { 
    var lat = coordinates[0]; 
    var lng = coordinates[1]; 

    $.get("https://us1.locationiq.com/v1/reverse.php?key=ee586a6285950d&lat=" +lat + "&lon=" + lng + "&format=json" , function(data){
        $('#location').text(data.address.state)
        setCookie('location',data.address.state)
    })
} 

getCoordintes(); 