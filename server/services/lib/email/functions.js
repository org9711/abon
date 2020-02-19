let nodemailer = require('nodemailer');

module.exports = {
  send: function(details) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'org97.abon@gmail.com',
        pass: 'abon-meals!!'
      }
    });

    let mailOptions = {
      from: 'Abon <org97.abon@gmail.com>',
      to: details.receiver,
      subject: details.subject,
      text: details.message
    };

    transporter.sendMail(mailOptions, function(err, res) {
        if (err) {
          console.error("Error sending email: ", err);
        }
        else {
          console.log(res);
        }
    });
  }
}
