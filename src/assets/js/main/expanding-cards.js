"use strict";

function ExCards(container, options){
  this.rowCount;//storing the set of classes used to toggle the drawer from each row.
  this.active_drawer;
  this.active_item;
  this.settings = {
    'transition': 400
  }
  
  this.init = function(){
    this.setSettings(options);
    this.setDrawers(container); //places a drawer under each row and sets classes used to toggle
    this.setToggles(container); //adds the click events for openning drawers and switching out the content
    this.windowResize(container);
  }
  return this.init();
}

ExCards.prototype.setSettings = function(options){
  var self = this;
  if(options.transition){
    this.settings.transition = options.transition;
  }
}

ExCards.prototype.setDrawers = function(container){
  var $item = $(container).children(".ex-item");
  var level = 1;
  var offsetCheck = $item.eq(0).offset().top;
    $item.each(function(i){
      var $this = $(this);
      if($this.offset().top == offsetCheck){ //if on same row
        $this.addClass('ex-trigger-' + level)
      } else { //if new row
        $this.before($("<div class='ex-drawer ex-drawer-"+ level +"'></div>"));
        level ++;
        $this.addClass('ex-trigger-' + level)
        offsetCheck = $this.offset().top;
      }
      offsetCheck = $this.offset().top;
    });
    //setting the last drawer.
    $item.eq($item.length-1).after($("<div class='ex-drawer ex-drawer-"+ level +"'></div>"));
    this.rowCount = level;//used to bind and unbind envent and remove classes.
  }

ExCards.prototype.setToggles = function(container){ 
  var self = this;
  for(let i = 1; i <= this.rowCount; i++){
    $(container).children(".ex-trigger-" + i).on('click', function(){
      var $this = $(this);
      var drawer_content_height;
      var $rowItem = $this.siblings(".ex-trigger-" + i);
      var $drawer = $this.siblings(".ex-drawer-" + i)
      //drawer was opened by this toggle so close drawer.
      if ($drawer.hasClass("ex-active") && $this.hasClass("ex-active")){
          $drawer.animate({"height": 0},self.settings.transition);
          $drawer.removeClass("ex-active");
          $this.removeClass("ex-active");
          self.active_drawer = null;
          self.active_item = null;
          //drawer is open but the content needs to be chainged.
          }else if($drawer.hasClass("ex-active") && !$this.hasClass("ex-active")) { 
            self.active_item.removeClass("ex-active");
            $this.addClass("ex-active");
            self.active_item = $this;
            $drawer.removeClass("ex-active");
            $drawer.html($this.children(".ex-drawer-content").html());
            drawer_content_height = $drawer.children('.ex-content').outerHeight();
            $drawer.animate({"height": drawer_content_height}, self.settings.transition);
            setTimeout(function(){
                $drawer.addClass("ex-active");
            },50);
          }else { //open drawer
            if($(container + " .ex-drawer.ex-active").length){ //if drawer is open in other 
                self.active_drawer.animate({"height": 0}, self.settings.transition);
                self.active_item.removeClass("ex-active");
                self.active_drawer.removeClass("ex-active");
               }
            $drawer.html($this.children(".ex-drawer-content").html());
            drawer_content_height = $drawer.children('.ex-content').outerHeight();
            $drawer.animate({"height": drawer_content_height}, self.settings.transition);
            setTimeout(function(){
                $drawer.addClass("ex-active");
                self.active_drawer = $drawer;
            },50);
            
            $this.addClass("ex-active");
            self.active_item = $this;   
          }
    });
  }
}

ExCards.prototype.reset = function(container){
    var self = this;
    var count = this.rowCount;
    $(container).children('.ex-drawer').remove();
    $(container).children('.ex-item').unbind();
    for(let i = 1; i <= count; i++){
        $('.ex-item').removeClass('ex-trigger-' + i);
    }
    self.setDrawers(container);
    self.setToggles(container);
}

ExCards.prototype.windowResize = function(container){
  var window_width = window.innerWidth;
  var self = this; 
  var resizing = true;
  var resizeInt;
  $(window).on('resize', function(){
    resizeInt = new Date().getTime();
    if(resizing){
      resizing = false;
        if(window_width != window.innerWidth){
            self.active_drawer.animate({"height": 0}, self.settings.transition);
            self.active_item.removeClass("ex-active");
            self.active_drawer.removeClass("ex-active");
          }
       var sizeEventCheck = setInterval(function(){
         var time = new Date().getTime();
         if (time > resizeInt + 50){
               resizing = true;
               clearInterval(sizeEventCheck);
               if(window_width != window.innerWidth){
                 window_width = window.innerWidth;
                 return self.reset(container);
               }
             }
       },100); 
    }
  })
};


var c = new ExCards('.ex-set-1', {transition: 400});

