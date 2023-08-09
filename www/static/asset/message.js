
let input = document.querySelector('.textarea');
let btn = document.querySelector('.sendBtn');
let bell = document.querySelector('.bell > i');
let bellCont = document.querySelector('.bell');
let load = document.querySelector('.load');
let subscribe = document.querySelector('.subscribe');
let alet = document.querySelector('.alert');
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

let added = false;

input.addEventListener("input", (e) => {
  let msg = e.target.innerHTML;
  if (msg.length > 0) {
    btn.style.pointerEvents = "auto";
    btn.style.backgroundColor = "green";
  }else {
    btn.style.pointerEvents = "none";
    btn.style.backgroundColor = "grey";
  }
})

subscribe.addEventListener("click", () => {
  $('#liveAlertPlaceholder').empty();
  bellCont.style.display = "none";
  load.style.display = "block";
  let message, alertType;
  setTimeout(() => {
    if (!added) {
      alet.innerHTML = "By clicking the Continue button, you <b>won't be</b> able to receive message notification from this user";
      bell.className = "bi bi-bell-fill";
      added = true;
      message = "Ahmad is added to your notification list";
      alertType = "success";
    }
    else {
      alet.innerHTML = "By clicking the Continue button, you <b>will be</b> able to receive message notification from this user"
      bell.className = "bi bi-bell-slash-fill";
      added = false;
      message = "Ahmad is removed from your notification list";
      alertType = "warning";
   }
   bellCont.style.display = "inline";
   load.style.display = "none";
   appendAlert(message, alertType);
  }, 3000)
})

btn.addEventListener('click', (e) => {
  let btn = e.target;
  btn.style.pointerEvents = "none";
  btn.style.backgroundColor = "grey";
  input.innerHTML = "";
})


const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="col- col-sm-10 col-md-8 col-lg-6 alert alert-${type} alert-dismissible container" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}


document.querySelector('.toast-body').addEventListener('click', () => {
  window.location.assign('/example.html?member="habeeb"')
})



// creating a dummy msg queryset
/*
condition this object must fufilled :
   must be ordered according to the date.
   seperate date and time into different entity.
   convert the date into human readable format.
   convert time into 12-hours time format.
   maximum of 30 msgs per request.
*/

let msgs = [
   {
     'id': '125',
     'body': 'hey, how was your trip',
     'date': 'yesterday',
     'time': '6:30pm',
     'me': true,
     'delivered': true
   },
   {
     'id': '572',
     'body': 'trip was good',
     'date': 'yesterday',
     'time': '6:35pm',
     'me': false
   },
   {
     'id': '520',
     'body': 'did you enjoy the hang out',
     'date': 'yesterday',
     'time': '7:00pm',
     'me': true,
     'delivered': true
   },
   {
     'id': '091',
     'body': 'yes, it was cool',
     'date': 'today',
     'time': '5:30am',
     'me': false
   },
   {
     'id': '354',
     'body': 'Good morning, how was your night',
     'date': 'today',
     'time': '7:30am',
     'me': false
   },
   {
     'id': '156',
     'body': 'fine, how was yours',
     'date': 'today',
     'time': '8:00am',
     'me': true,
     'delivered': false
   }
]