let nodemailer = require('nodemailer');

module.exports = {
  sendMail: function(receiver, subject, message) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'org97.abon@gmail.com',
        pass: 'abon-meals!!'
      }
    });

    let mailOptions = {
      from: 'Abon <org97.abon@gmail.com>',
      to: receiver,
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, function(err, res) {
        if (err) {
          console.log("Error sending email: ", err);
        }
    });
  }
}
