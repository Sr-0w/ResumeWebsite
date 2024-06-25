require('dotenv').config();
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const nodemailer = require("nodemailer");
const axios = require('axios');

const app = express();
const HTTP_PORT = 80;
const HTTPS_PORT = 443;

// Middleware pour logger toutes les requêtes
app.use((req, res, next) => {
    req.realIp = req.headers['cf-connecting-ip'] || req.ip;
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.realIp}`);
    next();
});

// Middleware for redirecting HTTP traffic to HTTPS
const httpApp = express();
httpApp.all('*', (req, res) => {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
});

httpApp.listen(HTTP_PORT, () => {
    console.log(`Redirecting all HTTP traffic to HTTPS on port ${HTTP_PORT}`);
});

let emailPass = Buffer.from(process.env.EMAIL_PASS, 'base64').toString('ascii');
let emailUser = process.env.EMAIL_USER;

// Set up Nodemailer for Gmail
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // false for TLS
    auth: {
        user: emailUser,
        pass: emailPass
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

// Middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.realIp}`);
    next();
});

// Serve static files
app.use(express.static(__dirname));

// Route to serve the PDF file and send email notification
app.get('/download-resume', (req, res) => {
    const filePath = path.join(__dirname, 'resume.pdf');
    console.log(`${new Date().toISOString()} - PDF download by ${req.realIp}`);

    async function getIpLocation(ip) {
        try {
            const response = await axios.get(`http://ipinfo.io/${ip}/json`);
            const data = response.data;
            // data contient des informations sur l'emplacement, telles que la ville, la région, le pays, etc.
            // console.log(data);
            return data;
        } catch (error) {
            console.error('Error getting IP location:', error);
            throw error;
        }
    }

    let ipLocation = getIpLocation(req.realIp)
        .then(location => {
            // console.log('The estimated location is', location);
            let requestTime = new Date();
            let formatter = new Intl.DateTimeFormat('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            let formattedRequestTime = formatter.format(requestTime);
            let userAgent = req.get('User-Agent');
            let acceptedLanguages = req.get('Accept-Language');
            let filePath = path.join(__dirname, 'email.html');

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading the file!', err);
                    return;
                }

                let htmlContent = data
                    .replace('${realIp}', req.realIp)
                    .replace('${formattedRequestTime}', formattedRequestTime)
                    .replace('${location.city}', location.city)
                    .replace('${location.region}', location.region)
                    .replace('${location.country}', location.country)
                    .replace('${location.org}', location.org)
                    .replace('${acceptedLanguages}', acceptedLanguages)
                    .replace('${userAgent}', userAgent);

                // Send email notification
                let mailOptions = {
                    from: 'resumewebsitenotice@gmail.com',
                    to: 'robin@snyders.xyz',
                    subject: 'Resume Download Alert',
                    html: htmlContent
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error sending email:', error);
                    } else {
                        console.log('Email sent:', info.response);
                    }
                });
            });

        })
        .catch(err => console.error('Error getting location', err));

    res.download(filePath, 'Robin Snyders Resume.pdf');
});

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
    key: fs.readFileSync(path.join(__dirname, 'key.pem'))
};

const server = https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`Server is running on https://localhost:${HTTPS_PORT}`);
});
