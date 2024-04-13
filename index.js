const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send_email', async (req, res, next) => {
    const { emails } = req.body;

    let emailSent = false;

    if (emails && emails.length) {
        const transpoter = await nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'idfastrent@gmail.com',
                pass: 'pqfs bwlt suhr smzr'
            }
        });

        for (const email of emails) {
            try {

                const { recipent, subject, message } = email;

                const mailOptions = {
                    from: 'idfastrent@gmail.com',
                    to: recipent,
                    subject: subject,
                    text: message
                };

                await transpoter.sendMail(mailOptions);
                console.log(`Succesfully Sending Email to ${recipent}`);
                emailSent = true;
            } catch (error) {
                console.error(`Error sending email to ${recipient}:`, error);
                emailSent = false;
            }
            
        }
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