
 // utility expression needed by DOM.
 reloaded();
 
 function reloaded() {
   let dialogHeight = $(window).height() - 40;
   $('.dialog').css("height", dialogHeight + "px");
 }
 
 $(window).on('resize', reloaded);




let initialScroll = 0;
 
 $('.body').scroll(function() {
      let scrollHeight = $(this).scrollTop();
    
      if (scrollHeight > initialScroll && scrollHeight > 100) {
        $('#buttons').fadeOut('linear');
      }
      else {
        $('#buttons').fadeIn('linear');
      }
      
      if (scrollHeight < 30) {
        $('.status').children().fadeIn('linear')
      }
      else {
        $('.status').children().fadeOut('linear')
      }
      
      initialScroll = scrollHeight;
  
 });
 
 
 if ($(window).width() >= 992) {
   $('.post').mouseover(function() {
   this.style.animationPlayState = "running";
   })
  
   $('.post').mouseleave(function() {
    animationEnd(this);
   })
 }
 else {
   $('.post').on("touchstart", function() {
     this.style.animationPlayState = "running";
   })
   
   $('.post').on("touchend", function() {
     setTimeout(() => {
       animationEnd(this);
     }, 100)
   })
 }
 

 $('.body').scroll(function() {
   let scrollTop = $(this).scrollTop();
   let windowHeight = $(this).height();
   let documentHeight = $(this)[0].scrollHeight;
   
   if ((scrollTop + windowHeight + 5) >= documentHeight) {
       setTimeout(() => {
         $('.spinner-border').css('visibility', 'visible')
       }, 500)
   }
 })
 
 
 // show dialog on post click event
 $('.post').click(function(event) {
   setTimeout(() => {
     $('.dialog').css('display', "block");
     $('.shower-tag:first').css('background-color', '#336699');
   
     $('html').css('overflow-y', 'hidden');
     loadStatus();
   }, 200)
 })
 
 
 // hide dialog on swipe event.
 let startY;
 $(".dialog").on("touchstart", function(event) {
   let touch = event.originalEvent.touches[0];
   startY = touch.clientY;
 });

 $(".dialog").on("touchend", function(event) {
   let touch = event.originalEvent.changedTouches[0];
   let endY = touch.clientY;
   let swipe = endY - startY;
   if (swipe > 70) {
     $('.shower-tag-cont').css("display", "none")
     $('.dialog').animate({top: '70%'}, 240, 'linear', dialogReset);
   }
});


 //hide dialog on dialog click event.
 $('.shower-cont').click(function(e) {
   if (e.target === this) dialogReset();
 })

 
 // next and back the status on click event.
 $('.the-media-cont').click(function(e) {
   let windowWidth = $(window).width();
   let windowCenter = windowWidth / 2;
   let leftSide = windowCenter - 100;
   let rightSide = windowCenter + 100;
   let touch = e.clientX;
  
   if (touch <= leftSide) console.log("back status");
   else if (touch >= rightSide) console.log("next status");
   else console.log("clicking here does nothing");
 })
 
 
  $('.reply').click(function(e) {
   $('.status-about').fadeOut('linear');
   $('.footer').fadeIn('linear');
   $('.textarea').focus()
 })
 
 
 $('.the-media-cont').click(function(e) {
   e.stopPropagation();
   $('.footer').fadeOut('linear');
   $('.status-about').fadeToggle('linear');
 })
 

 // toggle disable on reply elements.
 let input = document.querySelector('.textarea');
 input.addEventListener("input", (e) => {
  let msg = e.target.innerHTML;
  let btn = $('.sendBtn');
  if (msg.length > 0) {
    btn.css({
      "pointerEvents": "auto",
      "background-color": "green",
      })
  }else {
    btn.css({
      "pointerEvents": "none",
      "background-color": "grey",
      })
  }
})


 $('.sendBtn').click(function() {
   $('.reply-feedback').fadeIn('linear');
   resetFoot();
   setTimeout(() => {
     $('.reply-feedback').fadeOut('linear');
   }, 2000)
 })

 
 
 
 
 $('.my-status').click(function() {
    $(this).addClass('clicked');
    setTimeout(function() {
      $('.my-status').removeClass('clicked');
    }, 200);
 });


 // some utility functions
 function animationEnd(elem) {
      elem.style.animation = "none";
      elem.offsetWidth;
      elem.style.animation = null;
 }
 
  
 function dialogReset() {
    $('.dialog').css({
      "display": "none",
      "top": "40px",
      });
    $('html').css('overflow-y', 'auto');
    $('.shower-tag-cont').css("display", "flex")
    resetFoot();
    resetStatus();
 }
 
 function resetFoot() {
   $('.sendBtn').css({
     "pointerEvents": "none",
     "background-color": "grey",
     });
   $('.textarea').html("");
   $('.footer').fadeOut('linear');
   $('.status-about').css('display', 'none');
 }
 
 
 function resetStatus() {
   $('.the-media').css("display", "none");
   $('.the-media')
    .off("error")
    .off("load");
   animationEnd($('.the-status')[0])
 }
   