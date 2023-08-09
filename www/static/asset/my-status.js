
 // utility expression needed by DOM.
 reloaded();
 
 function reloaded() {
   let dialogHeight = $(window).height() - 40;
   $('.dialog').css("height", dialogHeight + "px");
 }
 
 $(window).on('resize', reloaded);



 // header hide/show animation on scroll event.
 $('.body').scroll(function() {
      let scrollHeight = $(this).scrollTop();
    
      if (scrollHeight > 50) {
        $('#buttons').fadeOut('linear');
      }
      else {
        $('#buttons').fadeIn('linear');
      }
 });
 
 // post click animation.
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
 
 
 // prevent click/touch/mouse event propagation on container.
 $('.del-btn')
     .on("touchstart", stopPropagation)
     .on("mouseover", stopPropagation);

 function stopPropagation(e) {
      e.stopPropagation();
      animationEnd($(e.target).parents('.post')[0]);
   }
 

 
// show dialog on post click event
 $('.post').click(function(event) {
   setTimeout(() => {
     $('.dialog').css('display', "block");
   
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
 
 
 $('.the-media-cont').click(function(e) {
   e.stopPropagation();
   $('.status-about').fadeToggle('linear');
 })


 
 
// status delete event.
 $('.del-btn').click(function(e) {
   e.stopPropagation();
   $('#liveAlertPlaceholder').empty();
   let id = this.dataset.id;
   $('.delete-confirm').data({id});
 })
 
 $('.delete-confirm').click(function() {
   let id = $(this).data("id");
   let selecString = `#${id}`;
   $(selecString).hide('fast', 'linear');
   
   /*
       --------
   remove related data from the database;
   do some logic base on operations success/error;
       --------
   */
   
   message = `Status deleted successfully`;
   
   alertType = "success";
   
   setTimeout(function() {
     $(selecString).remove();
     appendAlert(message, alertType);
   }, 2000)
   
 })
 
 
 

// utility function zone
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
    $('.add-status').css('visibility', 'visible');
    $('.shower-tag-cont').css("display", "flex")
    $('.status-about').css('display', 'none');
    resetStatus();
 }
 
 
 const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="col- col-sm-10 col-md-8 col-lg-6 alert alert-${type} alert-dismissible container" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    
    $('#liveAlertPlaceholder').empty();
    $('#liveAlertPlaceholder')[0].append(wrapper);
 }


 function resetStatus() {
   //console.log("status-reset is working");
   $('.the-media').css("display", "none");
   $('.the-media')
    .off("error")
    .off("load");
   animationEnd($('.the-status')[0]);
 }