
 
 $('.body').scroll(function() {
    let scrollHeight = $(this).scrollTop();
  
    if (scrollHeight > 50) {
      $('#buttons').fadeOut('linear');
    }
    else {
      $('#buttons').fadeIn('linear');
    }

 });
 
 
 let iconSource = "asset/userIcon.png";
 $('.account-pic').click(function() {
   $(this)
   .animate({height: '80px', width: '80px', top: '10px'}, 150, 'linear')
   .animate({height: '100px', width: '100px', top: 0}, 50, 'linear',
   function() {
     $('.dialog').fadeIn('linear');
     $('.dialog').css({display: 'flex'});
     $('.current-pic').attr('src', iconSource);
   })
   
 })
 
 
 $('#fileElem').change(function() {
    let fileList = this.files;
    let file = fileList[0];
    const fileType = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

    
    if (fileList.length < 1) {
      resetImage()
      //console.log("no file selected");
      return;
    }
    
    //console.log(file.type);
    if (!fileType.includes(file.type)) {
      resetImage()
      //console.log("unsupported file format");
      return;
    } 
    
    //continue execution.
    let reader = new FileReader();

    reader.onload = function(e) {
      iconSource = e.target.result;
      let imageHeight = $('.current-pic').height()
      $('.image-load').css({
        display: 'flex', 
        height: imageHeight,
      });
      resetImage();
    };
    reader.onerror = function() {
      resetImage();
      //console.log("error loading selected image");
    }
    
    reader.readAsDataURL(file);
  });
 
 
 $('.current-pic').on('load', function() {
    let width = $(this).width();
    let naturalWidth = $(this)[0].naturalWidth;
    let naturalHeight = $(this)[0].naturalHeight;
    
    let height = (width/naturalWidth) * naturalHeight;
    let boxHeight = $('.dialog').height() * 0.7;
    
    $('.current-pic').css('height', 'auto');
    $('.image-load').css({
      display: 'none', 
      height: 'none',
    });
     
    if (height > boxHeight) {
      $('.current-pic').css('height', boxHeight + "px");
    }
 })
 
 
 $('#remove-image').click(function() {
   let currentSource = $('.current-pic').attr('src');
   iconSource = "asset/userIcon.png";
   if (currentSource != iconSource) {
     let imageHeight = $('.current-pic').height()
     $('.image-load').css({
       display: 'flex', 
       height: imageHeight,
     });
     resetImage();
   }
 });
 
 
 $('.browse').click(function() {
    $(this).addClass('clicked');
    setTimeout(function() {
      $('.browse').removeClass('clicked');
    }, 300);
 });
 
 
 $('.close-dialog').click(function() {
   $('.dialog').fadeOut('linear');
 });
 
 
 $('.change-pass, .edit').click(function() {
    $(this).addClass('clicked');
    let elem = this;
    setTimeout(function() {
      $(elem).removeClass('clicked');
    }, 300);
 });
 
 $('.edit-edit').click(function() {
   $(this).css('display', 'none');
   $('.visible-input').css('display', 'none');
   
   $('.change-pass').css('display', 'none');
   
   $('.hidden-edit').fadeIn('linear');
   $('.hidden-input').fadeIn('linear');
 })
 
 $('.cancel-edit').click(function() {
   $('.hidden-edit').css('display', 'none');
   $('.hidden-input').css('display', 'none');
   
   $('.change-pass').fadeIn('linear');
   
   $('.edit-edit').fadeIn('linear');
   $('.visible-input').fadeIn('linear');
 })
 
 
 
 // so something on page load.
 let word = "I have always been a curious student and that form the base of my passion for science. With a dream of becoming a scientist, I gain admission into one of the prestigious school in my country (FUTA) to study industrial chemistry. But something change in my 3rd year when I was taking a course in computer science expected of students in my program. I was expose to a new world of science where computer are capable of more advanced task.";
 
 $(document).ready(function() {
   if (word.length > 200) {
     $('#aboutInput').html(word);
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
    