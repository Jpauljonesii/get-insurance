'use strict';

// Email api to send email after form is completed

var data = {
  service_id: 'service_sdvmxns',
  template_id: 'template_ov16v0w',
  user_id: 'CsSrUchO2q11ZAmjo',
  template_params: {
    username: 'James',
    'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...',
  },
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
