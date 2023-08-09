
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
        $('.member-head').children().fadeIn('linear')
      }
      else {
        $('.member-head').children().fadeOut('linear')
      }
      
      initialScroll = scrollHeight;
  
 });
 
 
 $('.search-member').click(function() {
    $(this).addClass('clicked');
    setTimeout(function() {
      $('.search-member').removeClass('clicked');
    }, 200);
  });
  
  
 $('.search-member').click(function() {
   $('.dialog')
   .fadeIn('linear')
   .css('display', 'flex');
   
   $('.search-input').focus();
 })
 
 
 $('.close-dialog').click(function() {
   $('.dialog').fadeOut('linear');
   $('.search-input')[0].value = "";
   $('.search-button')
     .removeClass('search-button-active')
     .addClass('search-button-inactive');
   $('.dialog-content')
     .scrollTop(0)
     .css('display', 'none');
   $('.dialog-loader').css('display', 'none');
 })
  
  
 $('.body').scroll(function() {
   let scrollTop = $(this).scrollTop();
   let windowHeight = $(this).height();
   let documentHeight = $(this)[0].scrollHeight;
   
   if ((scrollTop + windowHeight + 5) >= documentHeight) {
       setTimeout(() => {
         $('.body-loader').css('visibility', 'visible')
       }, 500)
   }
 })
 
 
 if ($(window).width() >= 992) {
   $('.user-friend, .search-user').mouseover(function() {
   this.style.animationPlayState = "running";
   })
  
   $('.user-friend, .search-user').mouseleave(function() {
    animationEnd(this);
   })
 }
 else {
   $('.user-friend, .search-user').on("touchstart", function() {
     this.style.animationPlayState = "running";
   })
   
   $('.user-friend, .search-user').on("touchend", function() {
     setTimeout(() => {
       animationEnd(this);
     }, 100)
   })
 }
 
 
 $('.user-friend, .search-user').click(function() {
   console.log('window is changing location');
 })
 
 
 // prevent click/touch/mouse event propagation on container.
 $('.follow-friend, .unfollow-friend')
     .on("touchstart", stopPropagation)
     .on("mouseover", stopPropagation);

 function stopPropagation(e) {
      e.stopPropagation();
      animationEnd($(e.target).parents('.user-friend, .search-user')[0]);
   }
 
 

 $('.follow-friend').click(followFriend)
 
 function followFriend(e) {
   // stop event propagation
   stopPropagation(e);
   
   let user = this.dataset.friend;
   let selecStr = `.${user}`;
   let targetElem = $(selecStr).find('button');
   
   $(targetElem).find('.btn-text').css("visibility", "hidden");
   $(targetElem).find('.spinner-border').css("visibility", "visible");
   
      
  setTimeout(function() {
     
     $(targetElem)
       .removeClass('follow-friend').addClass('unfollow-friend')
       .off("click")
       .on("click", unfollowFriend);
       
     $(targetElem).find('.btn-text').css("visibility", "visible");
     $(targetElem).find('.btn-text').html("unfollow");
     $(targetElem).find('.spinner-border').css("visibility", "hidden");
     
     $(selecStr).find('.mutual-msg').html(`${user} is your mutual`);
     
   }, 3000)
   
 }
 
 
 $('.unfollow-friend').click(unfollowFriend);
 
 function unfollowFriend(e) {
   // stop event propagation
   stopPropagation(e);
   
   let user = this.dataset.friend;
   let selecStr = `.${user}`;
   let targetElem = $(selecStr).find('button');

   $(targetElem).find('.btn-text').css("visibility", "hidden");
   $(targetElem).find('.spinner-border').css("visibility", "visible");
      
   setTimeout(function() {
     
     $(targetElem)
       .removeClass('unfollow-friend').addClass('follow-friend')
       .off("click")
       .on("click", followFriend);
       
     $(targetElem).find('.btn-text').css("visibility", "visible");
     $(targetElem).find('.btn-text').html("follow back");
     $(targetElem).find('.spinner-border').css("visibility", "hidden");
     
     $(selecStr).find('.mutual-msg').html(`${user} is following you`);
     
   }, 3000)
   
 }
 
 
 $('.search-button').click(function() {
   $('.dialog-loader').css('display', 'block');
   $('.dialog-content').css('display', 'none');
   setTimeout(function() {
     $('.dialog-loader').css('display', 'none');
     $('.dialog-content').css('display', 'flex');
   }, 3000)
 })
 
 
 $('.search-input')[0].addEventListener("input", (e) => {
  let msg = e.target.value;
  if (msg.length > 0) {
    $('.search-button')
     .removeClass('search-button-inactive')
     .addClass('search-button-active');
  }else {
    $('.search-button')
     .removeClass('search-button-active')
     .addClass('search-button-inactive');
  }
 })
 
 
 $('.dialog-content').scroll(function() {
   let scrollTop = $(this).scrollTop();
   let windowHeight = $(this).height();
   let documentHeight = $(this)[0].scrollHeight;
   
   if ((scrollTop + windowHeight + 25) >= documentHeight) {
       setTimeout(() => {
         $('.dialog-loader').css('display', 'block')
       }, 500)
   }
   
 })
 
 
 // some utility functions.
function animationEnd(elem) {
    elem.style.animation = "none";
    elem.offsetWidth;
    elem.style.animation = null;
}
 

 