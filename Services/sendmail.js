import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export function sendmail(toemail,subject,text) {
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
        });
        
        var mailOptions = {
        from: process.env.EMAIL_USER,
        to: toemail,
        subject: subject,
        text: text
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
}

export function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@smail\.iitm\.ac\.in$/;
    return regex.test(email);
}
