const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = 443;

// Middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.ip}`);
    next();
});

// Serve static files
app.use(express.static(__dirname));

// Route to serve the PDF file
app.get('/download-resume', (req, res) => {
    const filePath = path.join(__dirname, 'resume.pdf');
    console.log(`${new Date().toISOString()} - PDF download by ${req.ip}`);
    res.download(filePath, 'Robin Snyders Resume.pdf');
});

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
    key: fs.readFileSync(path.join(__dirname, 'key.pem'))
};

const server = https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
