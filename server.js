const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const nodemailer = require('nodemailer');
const stack = require('stack');

const app = express();
const HTTP_PORT = 80;
const HTTPS_PORT = 443;

// Middleware for redirecting HTTP traffic to HTTPS
const httpApp = express();
httpApp.all('*', (req, res) => {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
});

httpApp.listen(HTTP_PORT, () => {
    console.log(`Redirecting all HTTP traffic to HTTPS on port ${HTTP_PORT}`);
});

// Set up Nodemailer for Microsoft 365
let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,  // false for TLS
    auth: {
        user: 'robin@snyders.xyz',
        pass: '********'  // Use environment variable for password
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

// Middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.ip}`);
    next();
});

// Serve static files
app.use(express.static(__dirname));

// Route to serve the PDF file and send email notification
app.get('/download-resume', (req, res) => {
    const filePath = path.join(__dirname, 'resume.pdf');
    console.log(`${new Date().toISOString()} - PDF download by ${req.ip}`);

    // Send email notification
    let mailOptions = {
        from: 'robin@snyders.xyz',
        to: 'robin@snyders.xyz',
        subject: 'Resume Download Alert',
        text: `Someone with IP ${req.ip} downloaded the resume.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    res.download(filePath, 'Robin Snyders Resume.pdf');
});

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
    key: fs.readFileSync(path.join(__dirname, 'key.pem'))
};

const server = https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`Server is running on https://localhost:${HTTPS_PORT}`);
});
