
//  Wait for Bootstrap bundle, then handle contact form submissions
//
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const modalPromise = (async () => {
      while (typeof bootstrap === 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return new bootstrap.Modal(document.getElementById('submissionModal'));
    })();

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
        const modal = await modalPromise;
        modal.show();
        console.log('Email sent successfully');
      } else {
        throw new Error('Server responded with an error');
      }
    })
    .catch(error => {
      console.error('Error sending email:', error);
    })
    .finally(() => {
      form.reset();
    });
  });
});

