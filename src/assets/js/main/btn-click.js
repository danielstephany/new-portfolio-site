(function($){
    var last_pressed;
    var btn = $('.btn');

    btn.on('click', function(){
        var $this = $(this);
        last_pressed = $this;

        $('.last-pressed').removeClass('last-pressed');
        last_pressed.addClass('last-pressed');

        $this.addClass('active');
        setTimeout(function(){
            $this.removeClass('active');
        }, 250);
    });

window.addEventListener("beforeunload", function (event) {
  $('body').addClass("page-loading");
});
})(jQuery);

