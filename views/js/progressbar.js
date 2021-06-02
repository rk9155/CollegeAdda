function move(time) {
    $('.progress').show()
    $('.store-products').fadeOut();
    $("#myBar").animate({width:"100%"},time,function(){
        $('.progress').hide()
        $('.store-products').fadeIn()
        $("#myBar").css('width','0')
    })
}
