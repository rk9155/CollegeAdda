function move(time) {
    $('.progress').show()
    $('#products').fadeOut();
    $("#myBar").animate({width:"100%"},time,function(){
        $('.progress').hide()
        $('#products').fadeIn()
        $("#myBar").css('width','0')
    })
}
