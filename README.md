# Resume Website Project 🌟

Welcome to the Resume Website Project! This site is designed to professionally showcase your resume, allow visitors to download your resume as a PDF, and send an email notification with each download.

## Features 🚀

- **Sleek User Interface**: A modern, responsive design that looks great on all devices.
- **Resume Download**: Allows visitors to download your resume with a single click.
- **Email Notifications**: Sends an email notification with details like the approximate user location and timestamp every time the resume is downloaded.

## Technologies Used 💻

- **Node.js**: For the backend server.
- **Express.js**: A framework for building the server.
- **Nodemailer**: For sending email notifications.
- **Axios**: For making HTTP requests.
- **Particle.js**: For dynamic visual effects on the website.

## Getting Started 🏁

### 1. Clone the Repository
```sh
git clone <repository-link>
```

### 2. Install Dependencies
Navigate to the project folder and run:
```sh
npm install
```

### 3. Set up Environment Variables
Create environment variables for your email user and password. You can do this in your `.bashrc` or `.bash_profile` file as follows:
```sh
export EMAIL_USER='your-email@gmail.com'
export EMAIL_PASS='your-application-password'
```
Replace the placeholders with your Gmail address and application-specific password. 

Remember, you must enable "Less secure app access" in your Google Account to use Gmail with Nodemailer, and it's recommended to generate an [App Password](https://myaccount.google.com/apppasswords) for security reasons.

### 4. Replace the Resume and Photo
- Replace the `resume.pdf` file in the project folder with your resume.
- Replace the photo in the `index.html` file with your photo. Look for the `img` tag and change the `src` attribute to the path of your photo.

### 5. Start the Server with PM2
If you don’t have PM2 installed globally, install it first:
```sh
npm install pm2 -g
```
Then, navigate to the project folder and run:
```sh
pm2 start server.js
```

### 6. Visit the Website
Open your browser and go to `http://localhost:<your-port>`

## Live Demo 🌐

[Check out the live demo!](<https://snyders.xyz>)

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact 📧

For any questions or suggestions, feel free to reach out to me at <robin@snyders.xyz>
