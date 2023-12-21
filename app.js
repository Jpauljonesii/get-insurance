'use strict';

// Email api to send email after form is completed

function sendEmail(formData) {
  var data = {
    service_id: 'service_sdvmxns',
    template_id: 'template_ov16v0w',
    user_id: 'CsSrUchO2q11ZAmjo',
    template_params: formData,
  };
  $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
  })
    .done(function () {
      alert('Your mail is sent!');
    })
    .fail(function (error) {
      alert('Oops... ' + JSON.stringify(error));
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log(event.target);
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  //const formData=$(event.target).serializeArray()
  console.log(formProps);
  sendEmail(formProps);
}

const quoteForm = document.getElementById('regForm');
quoteForm.addEventListener('submit', handleFormSubmit);

let currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  let x = document.getElementsByClassName('tab');
  x[n].style.display = 'block';
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById('prevBtn').style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
  }
  if (n == x.length - 1) {
    document.getElementById('nextBtn').innerHTML = 'Submit';

  } else {
    document.getElementById('nextBtn').innerHTML = 'Next';
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  let x = document.getElementsByClassName('tab');
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = 'none';
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    // document.getElementById('regForm').submit();
    document.getElementById('nextBtn').type = 'submit';
    console.log('submitted');
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  let x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName('tab');
  y = x[currentTab].getElementsByTagName('input');
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == '') {
      // add an "invalid" class to the field:
      y[i].className += ' invalid';
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName('step')[currentTab].className += ' finish';
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  let i,
    x = document.getElementsByClassName('step');
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(' active', '');
  }
  //... and adds the "active" class to the current step:
  x[n].className += ' active';
}
