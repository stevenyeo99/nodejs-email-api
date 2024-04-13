const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const PORT = process.env.PORT | 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send_email', (req, res, next) => {
    const { emails } = req.body;

    let emailSent = false;

    if (emails && emails.length) {
        const transpoter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'idfastrent@gmail.com',
                pass: 'pqfs bwlt suhr smzr'
            }
        });

        let mailOptions;
        emails.forEach(email => {
            const { recipent, subject, message } = email;

            mailOptions = {
                from: 'idfastrent@gmail.com',
                to: recipent,
                subject: subject,
                text: message
            };
            
            transpoter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error Sending Email');
                } else {
                    console.log(`Succesfully Sending Email to ${recipent}`);
                }
            });
        });

        emailSent = true;
    }

    if (emailSent) {
        return res.status(200).json({
            message: "Succesfully Trigger Email"
        });
    } else {
        return res.status(400).json({
            message: "Failed Trigger Email"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Node Mailer Service is running on Port: ${PORT}`);
});

module.exports = app;