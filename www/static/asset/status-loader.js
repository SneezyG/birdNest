
function loadStatus() {
  $('.the-status').height("100%");
  $('.status-loading-cont').css("display", "block");
  
  let imageUrl = 'https://raw.githubusercontent.com/SneezyG/Demo/Master/images/social.jpg';
  let imageElement = $('.the-media');
  imageElement.attr('src', imageUrl);

  imageElement.on('load', function() {
    $('.the-media').css("display", "block");
    $('.status-loading-cont').css("display", "none");
    $('.the-status')[0].style.animationPlayState = "running";
    
    let width = $(this).width();
    let naturalWidth = $(this)[0].naturalWidth;
    let naturalHeight = $(this)[0].naturalHeight;
    
    let height = (width/naturalWidth) * naturalHeight;
    let boxHeight = $('.the-status').height();
    
    if (height < boxHeight) {
      $('.the-status').css('height', height + "px" );
    }
    
    $('.status-about').fadeIn('linear');
  });

  imageElement.on('error', imageError);
}

function imageError() {
  console.log('Failed to load the image.');
}
