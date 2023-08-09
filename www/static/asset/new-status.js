
let focus = true;
  $('#add-caption').click(function() {
    $('.footer').fadeToggle('linear');
    if (focus) $('.textarea').focus();
    focus = !focus;
  })

 
 $('.browse').click(function() {
    $(this).addClass('clicked');
    setTimeout(function() {
      $('.browse').removeClass('clicked');
    }, 300);
  });
  
  
  $('#add-image').click(function() {
    $('#liveAlertPlaceholder').empty();
    if ($(window).width() >= 768) {
      $('.body').scrollTop(80);
    }
    else $('.body').scrollTop(130);
  }) 
  
  $('#send-update').click(function() {
    $('.dialog').fadeIn('linear');
    setTimeout(function() {
      $('.dialog').fadeOut('linear');
      imageLoadError();
      
      message = "status updated successfully";
      alertType = "success";
      appendAlert(message, alertType);
    }, 3000)
  })
  
  
  $('.body').scroll(function() {
    if ($(this).scrollTop() >= 30) {
      $('#buttons').fadeOut('linear');
    }
    else {
      $('#buttons').fadeIn('linear');
    }
  });
  
  
  $('#fileElem').change(function() {
    let fileList = this.files;
    let file = fileList[0];
    const fileType = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

    
    if (fileList.length < 1) {
      imageLoadError()
      //console.log("no file selected");
      return;
    }
    
    //console.log(file.type);
    if (!fileType.includes(file.type)) {
      imageLoadError()
      //console.log("unsupported file format");
      return;
    } 
    
    //continue execution.
    let reader = new FileReader();

    reader.onload = function(e) {
      $('.the-image').attr('src', e.target.result);
      $('#add-caption, #send-update')
        .removeClass('browse-inactive')
        .addClass('browse-active');
    };
    reader.onerror = function() {
      imageLoadError();
      //console.log("error loading selected image");
    }
    
    reader.readAsDataURL(file);
   
  });
  
  
  $('.the-image').on('load', function() {
    let width = $(this).width();
    let naturalWidth = $(this)[0].naturalWidth;
    let naturalHeight = $(this)[0].naturalHeight;
    
    let height = (width/naturalWidth) * naturalHeight;
    let boxHeight = $('.image').height() * 0.9;

    $('.the-image').css('height', 'auto');
    if (height > boxHeight) {
      $('.the-image').css('height', boxHeight + "px");
    }
  });
  
  
  $('.the-image').on('error', function() {
    //console.log("error loading image");
    imageLoadError();
  })
  
  
  function imageLoadError() {
    $('.the-image').attr('src', "asset/no-image.png");
    $('#add-caption, #send-update')
      .removeClass('browse-active')
      .addClass('browse-inactive');
    $('#fileElem').val('');
    $('.textarea').html("");
    $('.footer').css('display', 'none');
    //flip focus variable value to reset textarea focus status.
    focus = true;
  }
  
  
 const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="col- col-sm-10 col-md-8 col-lg-6 alert alert-${type} alert-dismissible container" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    
    $('#liveAlertPlaceholder')[0].append(wrapper);
 }
    