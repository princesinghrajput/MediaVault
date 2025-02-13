# MediaVault 📸

![MediaVault Dashboard](https://raw.githubusercontent.com/princesinghrajput/MediaVault/refs/heads/main/main/screenshots/dashboard.png)

A modern media management platform that helps you store, organize, and share your photos and videos securely in the cloud.

## ✨ Features

- **Drag & Drop Upload** - Easy file uploads with preview
- **Smart Organization** - Auto-categorization of images and videos
- **Secure Storage** - AWS S3 powered cloud storage
- **Responsive Design** - Works great on desktop and mobile
- **User Authentication** - Secure account management

![Upload](https://raw.githubusercontent.com/princesinghrajput/MediaVault/refs/heads/main/main/screenshots/upload.png)

![Upload Preview](https://raw.githubusercontent.com/princesinghrajput/MediaVault/refs/heads/main/main/screenshots/preview.png)

## 🚀 Tech Stack

### Frontend
- React JS
- Material UI
- Redux Toolkit
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- AWS S3
- JWT Authentication

## 🛠️ Installation

### Prerequisites
- Node.js
- MongoDB
- AWS Account with S3 bucket

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/princesinghrajput/MediaVault.git
cd mediavault
```

2. Install dependencies
```bash
# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../client
npm install
```

3. Configure environment variables

Create `.env` files in both client and server directories:

```bash
# server/.env
PORT=6000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name

# client/.env
VITE_API_URL=http://localhost:6000
```

4. Start the application
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm run dev
```

## 📱 Screenshots

### Desktop View
![Desktop View](https://raw.githubusercontent.com/yourusername/mediavault/main/screenshots/desktop.png)

### Mobile View
![Mobile View](https://raw.githubusercontent.com/yourusername/mediavault/main/screenshots/mobile.png)

## 🔒 Security Features

- JWT based authentication
- Secure file uploads with type validation
- AWS S3 private bucket configuration
- Input sanitization
- Protected API routes

## 🎯 Usage Guide

1. **Authentication**
   - Register a new account
   - Login with your credentials
   - Secure session management

2. **Media Upload**
   - Click upload button or drag & drop
   - Preview before upload
   - Progress indicator
   - Automatic file type detection

3. **Media Management**
   - Filter between images and videos
   - Grid view layout
   - Quick delete option
   - Responsive gallery

## 🚧 Upcoming Features

- [ ] Share media via links
- [ ] Create albums
- [ ] Search functionality
- [ ] Batch operations
- [ ] Download options


## 👨‍💻 Author

Prince Kumar
- GitHub: [@princesinghrajput](https://github.com/princesinghrajput)
- LinkedIn: [Prince](https://www.linkedin.com/in/prince-kumar-05/)
---

Made with ❤️ 