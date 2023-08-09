
let initialScroll = 0;
 
 $('.body').scroll(function() {
      let scrollHeight = $(this).scrollTop();
    
      if (scrollHeight > initialScroll && scrollHeight > 80) {
        $('#buttons').fadeOut('linear');
      }
      else {
        $('#buttons').fadeIn('linear');
      }
      
      if (scrollHeight < 30) {
        $('.chat').children().fadeIn('linear')
      }
      else {
        $('.chat').children().fadeOut('linear')
      }
      
      initialScroll = scrollHeight;
  
 });
 
 
 if ($(window).width() >= 992) {
   $('.user-chat').mouseover(function() {
   this.style.animationPlayState = "running";
   })
  
   $('.user-chat').mouseleave(function() {
    animationEnd(this);
   })
 }
 else {
   $('.user-chat').on("touchstart", function() {
     this.style.animationPlayState = "running";
   })
   
   $('.user-chat').on("touchend", function() {
     setTimeout(() => {
       animationEnd(this);
     }, 100)
   })
 }
 
 
 $('.user-chat').click(function() {
   console.log('window is changing location');
 })
 
 
 // prevent click/touch/mouse event propagation on container.
 $('.del-btn')
     .on("touchstart", stopPropagation)
     .on("mouseover", stopPropagation);

 function stopPropagation(e) {
      e.stopPropagation();
      animationEnd($(e.target).parents('.user-chat')[0]);
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
 
 
 $('.del-btn').click(function(e) {
   // stop event propagation
   stopPropagation(e);
   $('#liveAlertPlaceholder').empty();
   let delMutual = this.dataset.mutual;
   $('.alert-mutual-name').html(delMutual);
   $('.delete-confirm').data({delMutual});
 })
 
 
 $('.delete-confirm').click(function() {
   let delMutual = $(this).data("delMutual");
   let selecString = `#${delMutual}`;
   $(selecString).hide('fast', 'linear');
   
   /*
       --------
   remove related data from the database;
   do some logic base on operations success/error;
       --------
   */
   
   message = `Your chat with <b style="font-size: 15px;"> ${delMutual} </b> deleted successfully`;
   
   alertType = "success";
   
   setTimeout(function() {
     $(selecString).remove();
     appendAlert(message, alertType);
   }, 2000)
   
 })
 
 
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


 // some utility functions.
 function animationEnd(elem) {
      elem.style.animation = "none";
      elem.offsetWidth;
      elem.style.animation = null;
 }
   