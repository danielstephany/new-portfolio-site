"use strict";
(function($){
  hobbyTicker();

  function hobbyTicker(){
    var $hobbyList = $(".hobby-list");
    var $list = $(".hobby-list li");
    var listLength = $list.length;
    var currentIndex = 0;
    //sets the first active item
    $list.eq(currentIndex).addClass("active");
    //sets the interval between switching out the next item
    setInterval(function(){
      if(currentIndex == (listLength - 1)){
        currentIndex = 0;
      } else {
        currentIndex ++;
      }
      $hobbyList.children(".active").removeClass("active");
      $list.eq(currentIndex).addClass("active");
    },3000);
  }
})(jQuery);
