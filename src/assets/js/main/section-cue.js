
sectionCue();

function sectionCue() {
  var $hero = $('.hero');
  var $firstSection = $hero.outerHeight();
  $('.section-cue').on('click', function(){
    $('html, body').animate({
      scrollTop: $firstSection
    }, 1000);
  });
}
