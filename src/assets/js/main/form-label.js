(function($){
    var input = $('input, textarea');
    var form_item;
    var current_item;

    input.on('focus', function(){
        var $this = $(this);
        current_item = $this;
        form_item = $this.parent('.form-item');
        form_item.addClass('active');
    });
    input.on('change', function(){
        var $this = $(this);
        current_item = $this;
        form_item = $this.parent('.form-item');
        form_item.addClass('active');
    });
     input.on('blur', function(){
         if(current_item.val() === ''){
            form_item.removeClass('active');
         }
    });
})(jQuery);