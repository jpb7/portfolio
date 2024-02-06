const express = require('express');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/send', (req, res) => {
  const msg = {
    to: process.env.TARGET_EMAIL,
    from: process.env.SENDER_EMAIL,
    subject: `Contact form: ${req.body.name} (${req.body.email})`,
    text: `${req.body.message}`,
    html: `${req.body.message}`,
  };

  sgMail.send(msg).then(() => {
    console.log('Email sent');
    res.status(200).send('Email sent successfully');
  })
  .catch(err => {
    console.error('SendGrid error:', err.message);
    if (err.response) {
      console.error('SendGrid error response:', err.response.body)
    }
    res.status(500).send('Error sending email');
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

