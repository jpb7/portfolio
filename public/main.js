import { Modal } from 'https://cdn.skypack.dev/bootstrap';

//  Handle contact form submissions
//
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const modal = new Modal(document.getElementById('submissionModal'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formObj = {};
    formData.forEach((value, key) => formObj[key] = value);

    fetch('/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObj)
    })
    .then(async (response) => {
      if (response.ok) {
        modal.show();
        console.log('Email sent successfully');
      } else {
        throw new Error('Server responded with an error');
      }
    })
    .catch(error => {
      console.error('Error sending email:', error.message);
    })
    .finally(() => {
      form.reset();
    });
  });
});

