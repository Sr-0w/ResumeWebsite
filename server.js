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

// Middleware to deny access to sensitive files
const denySensitiveFiles = (req, res, next) => {
    const sensitiveFiles = ['key.pem', 'cert.pem'];
    if (sensitiveFiles.some(file => req.path.includes(file))) {
        const forbiddenPath = path.join(__dirname, 'forbidden.html');
        
        fs.readFile(forbiddenPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading forbidden.html:', err);
                return res.status(403).send('Access Forbidden');
            }
            res.status(403).contentType('text/html').send(data);
        });
    } else {
        next();
    }
};

// Middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.realIp}`);
    next();
});

// Apply middleware to deny access to sensitive files
app.use(denySensitiveFiles);

// Serve static files
app.use(express.static(__dirname));

//Articles
app.get('/fujitsu-server', (req, res) => {
    res.sendFile(path.join(__dirname, 'fujitsu-server.html'));
});

app.get('/homelab', (req, res) => {
    res.sendFile(path.join(__dirname, 'homelab.html'));
});

app.get('/3D-printer', (req, res) => {
    res.sendFile(path.join(__dirname, '3D-printer.html'));
});

app.get('/ESP32', (req, res) => {
    res.sendFile(path.join(__dirname, 'ESP32.html'));
});

app.get('/this-website', (req, res) => {
    res.sendFile(path.join(__dirname, 'this-website.html'));
});

app.get('/github-projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'github-projects.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/view-resume', (req, res) => {
    const filePath = path.join(__dirname, 'resume.pdf');
    console.log(`${new Date().toISOString()} - PDF viewed by ${req.realIp}`);

    async function getIpLocation(ip) {
        try {
            const response = await axios.get(`http://ipinfo.io/${ip}/json`);
            const data = response.data;
            return data;
        } catch (error) {
            console.error('Error getting IP location:', error);
            throw error;
        }
    }

    let ipLocation = getIpLocation(req.realIp)
        .then(location => {
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
                    subject: 'Resume Viewed Alert',
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

    res.sendFile(filePath, 'resume.pdf', { headers: { 'Content-Disposition': 'inline' } });
});


// Route to serve the PDF file and send email notification
app.get('/download-resume', (req, res) => {
    const filePath = path.join(__dirname, 'resume.pdf');
    console.log(`${new Date().toISOString()} - PDF download by ${req.realIp}`);

    async function getIpLocation(ip) {
        try {
            const response = await axios.get(`http://ipinfo.io/${ip}/json`);
            const data = response.data;
            return data;
        } catch (error) {
            console.error('Error getting IP location:', error);
            throw error;
        }
    }

    let ipLocation = getIpLocation(req.realIp)
        .then(location => {
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
    
    // Send server start notification email
    sendServerStartEmail();
});

function sendServerStartEmail() {
    const startTime = new Date();
    const formatter = new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const formattedStartTime = formatter.format(startTime);

    fs.readFile(path.join(__dirname, 'email.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the email template file!', err);
            return;
        }

        let htmlContent = data
            .replace('<h1>Someone downloaded the resume ! 🎉</h1>', '<h1>Server has started ! 🚀</h1>')
            .replace('<p>It was downloaded by IP address <strong>${realIp}</strong></p>', `<p>Server IP address :<strong>${getServerIP()}</strong></p>`)
            .replace('<p>The request was made at <strong>${formattedRequestTime}</strong></p>', `<p>Started at <strong>${formattedStartTime}</strong></p>`)
            .replace('<p>The estimated location is <strong>${location.city}, ${location.region}, ${location.country}</strong></p>', '')
            .replace('<p>The possible organization assiciated with this IP might be <strong>${location.org}</strong></p>', '')
            .replace('<p>The accepted languages are <strong>${acceptedLanguages}</strong></p>', '')
            .replace('<p>The user agent is <strong>${userAgent}</strong></p>', '')
            .replace('href="https://ipinfo.io/${realIp}"', 'href="https://snyders.xyz"')
            .replace('More info about IP Address', 'Verify if it works');

        const mailOptions = {
            from: 'resumewebsitenotice@gmail.com',
            to: 'robin@snyders.xyz',
            subject: 'Server Start Notification',
            html: htmlContent
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending server start email:', error);
            } else {
                console.log('Server start email sent:', info.response);
            }
        });
    });
}

function getServerIP() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '0.0.0.0';
}