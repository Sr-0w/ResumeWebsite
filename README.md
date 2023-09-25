### Resume Website Project 🌟

Welcome to the Resume Website Project! This project is designed to professionally showcase your resume, allow visitors to download your resume as a PDF, and send an email notification with each download.

![Preview](https://i.imgur.com/cBQ1MFo.png)


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
git clone https://github.com/username/ResumeWebsite.git
```

### 2. Install Dependencies
Navigate to the project folder and run:
```sh
npm install
```

### 3. Set up Environment Variables 🌿

To run this project, set up the `EMAIL_USER` and `EMAIL_PASS` environment variables for your Gmail address and application-specific password, respectively. Follow the steps below:

#### a. Open Your `.bashrc` or `.bash_profile` 📂
```sh
nano ~/.bashrc  # or nano ~/.bash_profile
```

#### b. Export your Gmail Address 📧
Add the following line, replacing `'your-email@gmail.com'` with your Gmail address:
```sh
export EMAIL_USER='your-email@gmail.com'
```

#### c. Encode Your Google App Password in Base64 🔐
Google App Passwords may contain spaces and must be encoded in Base64. 

- Use an [online Base64 encoder](https://www.base64encode.org/)
- Or, use the command line:
  ```sh
  echo -n 'your app password' | base64
  ```
Replace `'your app password'` with your actual app password, keeping the single quotes.

#### d. Export your Encoded App Password 🛠
Add the following line, replacing `'your-encoded-app-password'` with your Base64 encoded password:
```sh
export EMAIL_PASS='your-encoded-app-password'
```

#### e. Save and Exit the File 💾
Press `CTRL + X`, then `Y`, and finally `Enter` to save and exit.

#### f. Load the new Environment Variables 🔄
```sh
source ~/.bashrc  # or source ~/.bash_profile
```

### 🛑 Important Notes 🛑
- Enable "Less secure app access" in your Google Account to use Gmail with Nodemailer.
- Generate an [App Password](https://myaccount.google.com/apppasswords) for security reasons.

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

For any questions or suggestions, feel free to reach out at <robin@snyders.xyz>
