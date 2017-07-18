'use strict';
sethero();
function sethero(){
    var h = window.innerHeight;
    $('.hero').css({"min-height": h});

    $(window).on('resize', function(){
        if($(window).width() > 768){
            h = window.innerHeight;
            $('.hero').css({"min-height": h});
        }
    });
}
 