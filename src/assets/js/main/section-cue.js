"use strict";

(function(){
  sectionCue();

  function sectionCue() {
    var $hero = $('.hero');
    var $firstSection = $hero.outerHeight() - 50;
    $('.section-cue').on('click', function(){
      $('html, body').animate({
        scrollTop: $firstSection
      }, 1000);
    });

    $(window).on("resize", function() {
      $firstSection = $hero.outerHeight();
    })
  }
})(jQuery);

$('a[href^="#"]').on('click', function(event){   
  var hash = this.hash;
    $('html,body').animate({scrollTop: ($(hash).offset().top) + $(window).scrollTop()}, 500);
});