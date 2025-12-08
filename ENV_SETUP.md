# Environment Variables Setup

## Email Configuration

Create a `.env` file in the root directory with the following content:

```env
# SMTP Email Configuration
EMAIL_USER=zyradigitalsofficial@gmail.com
EMAIL_PASS=nmcugwmikuxifur
ADMIN_EMAIL=zyradigitalsofficial@gmail.com

# Server Configuration
PORT=3001
```

**Note:** The `EMAIL_PASS` should be your Google App Password without spaces. If you have it with spaces (like "nmcu gwmc ikux ifur"), remove the spaces when adding it to the `.env` file (it becomes "nmcugwmikuxifur").

## Important Notes

1. The `.env` file is already added to `.gitignore` to keep your credentials secure.
2. Make sure to create the `.env` file before running the server.
3. The email service uses Google SMTP (Gmail) for sending emails.
4. The password should be an App Password from Google, not your regular Gmail password.

## Running the Application

After creating the `.env` file, you can start the development server:

```bash
npm run dev
```

This will start both the frontend (Vite) and backend (Express) servers concurrently.

