const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir les fichiers statiques
app.use(express.static(__dirname));

// Route pour servir le fichier PDF
app.get('/download-resume', (req, res) => {
    const filePath = path.join(__dirname, 'resume.pdf');
    res.download(filePath, 'Robin Snyders Resume.pdf');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
