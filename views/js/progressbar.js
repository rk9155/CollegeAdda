function move() {
    $('.progress').show()
    $("#myBar").css("width","100%")
    setTimeout(function(){
        $("#myBar").css("width","0%")
        $('.progress').hide()
        
    },2000)
}
