
 
 $('.body').scroll(function() {
    let scrollHeight = $(this).scrollTop();
  
    if (scrollHeight > 50) {
      $('#buttons').fadeOut('linear');
    }
    else {
      $('#buttons').fadeIn('linear');
    }

 });
 
 
 if ($(window).width() >= 992) {
   $('.user-friend').mouseover(function() {
   this.style.animationPlayState = "running";
   })
  
   $('.user-friend').mouseleave(function() {
    animationEnd(this);
   })
 }
 else {
   $('.user-friend').on("touchstart", function() {
     this.style.animationPlayState = "running";
   })
   
   $('.user-friend').on("touchend", function() {
     setTimeout(() => {
       animationEnd(this);
     }, 100)
   })
 }


 $('.user-friend').click(function() {
   console.log('window is changing location');
 })
 
 

 
 // prevent click/touch/mouse event propagation on container.
 $('.follow-friend, .unfollow-friend')
     .on("touchstart", stopPropagation)
     .on("mouseover", stopPropagation);

 function stopPropagation(e) {
      e.stopPropagation();
      animationEnd($(e.target).parents('.user-friend')[0]);
   }
 


 
 $('.more-friend').click(function() {
    $(this).addClass('clicked');
    setTimeout(function() {
      $('.my-status').removeClass('clicked');
    }, 200);
  });

 
 
 $('.account-pic').click(function() {
   $(this)
   .animate({height: '80px', width: '80px', top: '10px'}, 150, 'linear')
   .animate({height: '100px', width: '100px', top: 0}, 50, 'linear',
   function() {
     $('.dialog').fadeIn('linear');
     $('.dialog').css({display: 'flex'});
     $('.current-pic').attr('src', 'asset/userIcon.png');
   })
   
 })



 $('.current-pic').on('load', function() {
    let width = $(this).width();
    let naturalWidth = $(this)[0].naturalWidth;
    let naturalHeight = $(this)[0].naturalHeight;
    
    let height = (width/naturalWidth) * naturalHeight;
    let boxHeight = $('.dialog').height() * 0.7;
    
    $('.current-pic').css('height', 'auto');

    if (height > boxHeight) {
      $('.current-pic').css('height', boxHeight + "px");
    }
 })
 
 
 
 $('.close-dialog').click(function() {
   $('.dialog').fadeOut('linear');
 });
 
 
 $('#follow').click(function() {
   $(this).find('.btn-text').css("visibility", "hidden");
   $(this).find('.spinner-border').css("visibility", "visible");
   let targetElem = this;
   
   setTimeout(function() {
     
     $(targetElem).find('.btn-text').css("visibility", "visible");
     $(targetElem).find('.spinner-border').css("visibility", "hidden");
     $(targetElem).removeClass('able-btn').addClass('disable-btn');
     
     $('#unfollow').removeClass('disable-btn').addClass('able-btn');
     $('.info-text').html('Sneezy is your mutual');

   }, 3000)
 })
 
 
 $('#unfollow').click(function() {
   $(this).find('.btn-text').css("visibility", "hidden");
   $(this).find('.spinner-border').css("visibility", "visible");
   let targetElem = this;
   
   setTimeout(function() {
     
     $(targetElem).find('.btn-text').css("visibility", "visible");
     $(targetElem).find('.spinner-border').css("visibility", "hidden");
     $(targetElem).removeClass('able-btn').addClass('disable-btn');
     
     $('#follow').removeClass('disable-btn').addClass('able-btn');
     $('.info-text').html('Sneezy is following you');
     
   }, 3000)
 })
 
 
 $('.follow-friend').click(followFriend)
 
 function followFriend(e) {
   // stop event propagation
   stopPropagation(e);

   $(this).find('.btn-text').css("visibility", "hidden");
   $(this).find('.spinner-border').css("visibility", "visible");
   let user = this.dataset.friend;
   let container = $(this).parents('.user-friend');
   let targetElem = this;
   
      
  setTimeout(function() {
     
     $(targetElem)
       .removeClass('follow-friend').addClass('unfollow-friend')
       .off("click")
       .on("click", unfollowFriend);
       
     $(targetElem).find('.btn-text').css("visibility", "visible");
     $(targetElem).find('.btn-text').html("unfollow");
     $(targetElem).find('.spinner-border').css("visibility", "hidden");
     
     container.find('.mutual-msg').html(`You are following ${user}`);
     
   }, 3000)
   
 }
 
 
 $('.unfollow-friend').click(unfollowFriend);
 
 function unfollowFriend(e) {
   // stop event propagation
   stopPropagation(e);

   $(this).find('.btn-text').css("visibility", "hidden");
   $(this).find('.spinner-border').css("visibility", "visible");
   let user = this.dataset.friend;
   let container = $(this).parents('.user-friend');
   let targetElem = this;
      
   setTimeout(function() {
     
     $(targetElem)
       .removeClass('unfollow-friend').addClass('follow-friend')
       .off("click")
       .on("click", followFriend);
       
     $(targetElem).find('.btn-text').css("visibility", "visible");
     $(targetElem).find('.btn-text').html("follow");
     $(targetElem).find('.spinner-border').css("visibility", "hidden");
     
     container.find('.mutual-msg').html(`${user} is not your friend`);
     
   }, 3000)
   
 }
 
 
 
 // so something on page load.
 let word = "I have always been a curious student and that form the base of my passion for science. With a dream of becoming a scientist, I gain admission into one of the prestigious school in my country (FUTA) to study industrial chemistry. But something change in my 3rd year when I was taking a course in computer science expected of students in my program. I was expose to a new world of science where computer are capable of more advanced task.";
 
 $(document).ready(function() {
   if (word.length > 200) {
     see();
   }
 });
 
 
 function seeMore() {  
   $(this)
   .animate({fontSize: '13px'}, 50, 'linear')
   .animate({fontSize: '15px'}, 50, 'linear', function() {
      let about = word + '<span class="about-see-less text-nowrap">see less</span>';
      $('.about-value').html(about);
      $('.about-see-less').click(seeLess);
   });
 }


function seeLess() {
   $(this)
   .animate({fontSize: '13px'}, 50, 'linear')
   .animate({fontSize: '15px'}, 50, 'linear', see);
}


function see() {
  let about = word.slice(0, 199) + ' ...' +
     '<span class="about-see-more text-nowrap">see more</span>';
  $('.about-value').html(about);
  $('.about-see-more').click(seeMore);
}


function resetImage() {
  setTimeout(() => {
    $('.current-pic').attr('src', iconSource);
    $('.account-pic').attr('src', iconSource);
    $('#fileElem').val('');
  }, 2000)
}


// some utility functions.
function animationEnd(elem) {
    elem.style.animation = "none";
    elem.offsetWidth;
    elem.style.animation = null;
}
   
    