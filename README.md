# Real Trust Application

A full-stack web application for managing and showcasing projects, client testimonials, contact forms, and newsletter subscriptions. Built with modern technologies and deployed on cloud platforms.

## 🚀 Features

### Public Landing Page
- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **Projects Section**: Dynamic display projects with images and descriptions
- **Happy Clients Section**: Client testimonials with photos and designations
- **Contact Form**: Fully functional contact form with validation
- **Newsletter Subscription**: Email subscription with duplicate detection
- **Centralized Content**: All text content managed from constants file

### Admin Panel (No Authentication Required)
- **Add Project**: Upload and crop project images, add details
- **Add Client**: Upload and crop client photos, add testimonials
- **View Contact Forms**: Table view of all contact form submissions
- **View Newsletter Subscribers**: List of all email subscribers

### Image Cropping
- **React Cropper Integration**: Crop images to 450 × 350 pixels
- **Fixed Aspect Ratio**: Consistent image dimensions
- **Live Preview**: See cropped image before upload
- **Cloudinary Storage**: Images stored securely in the cloud

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Cropper** - Image cropping functionality
- **Cropperjs** - Core cropping library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **Cloudinary** - Image hosting and management
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas Account** (free tier)
- **Cloudinary Account** (free tier)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ManishPatidar806/Real-Trust.git
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Getting MongoDB Atlas Connection String:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

**Getting Cloudinary Credentials:**
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Find credentials in Dashboard
4. Copy Cloud Name, API Key, and API Secret

Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in the Frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

### Backend Structure
```
Backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── cloudinary.js         # Cloudinary configuration
├── models/
│   ├── Project.js            # Project schema
│   ├── Client.js             # Client schema
│   ├── ContactForm.js        # Contact form schema
│   └── NewsletterSubscriber.js # Newsletter schema
├── controllers/
│   ├── projectController.js  # Project logic
│   ├── clientController.js   # Client logic
│   ├── contactController.js  # Contact form logic
│   └── newsletterController.js # Newsletter logic
├── routes/
│   ├── projectRoutes.js      # Project endpoints
│   ├── clientRoutes.js       # Client endpoints
│   ├── contactRoutes.js      # Contact endpoints
│   └── newsletterRoutes.js   # Newsletter endpoints
├── middleware/
│   └── upload.js             # Multer configuration
├── server.js                 # Express app entry point
├── package.json
└── .env
```

### Frontend Structure
```
Frontend/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx       # Public landing page
│   │   └── Admin.jsx         # Admin panel
│   ├── components/
│   │   ├── ProjectCard.jsx   # Project display card
│   │   ├── ClientCard.jsx    # Client testimonial card
│   │   ├── ContactForm.jsx   # Contact form component
│   │   ├── Newsletter.jsx    # Newsletter subscription
│   │   └── ImageCropper.jsx  # Image cropping component
│   ├── constants/
│   │   └── content.js        # Site content and configuration
│   ├── hooks/
│   │   └── useForm.js        # Form handling hook
│   ├── utils/
│   │   └── helpers.js        # Utility functions
│   ├── services/
│   │   └── api.js            # Axios API service
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Tailwind CSS styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env
```

## 🌐 API Endpoints

### Projects
- `POST /api/projects` - Create a new project (with image upload)
- `GET /api/projects` - Get all projects

### Clients
- `POST /api/clients` - Create a new client (with image upload)
- `GET /api/clients` - Get all clients

### Contact Forms
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscribers

## 🚀 Deployment

### Backend Deployment (Render)

1. **Create Render Account**: Sign up at [render.com](https://render.com)

2. **Create New Web Service**:
   - Connect your GitHub repository
   - Select the Backend directory
   - Configure:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment**: Node

3. **Add Environment Variables**:
   ```
   PORT=5000
   MONGODB_URI=<your_mongodb_uri>
   CLOUDINARY_CLOUD_NAME=<your_cloud_name>
   CLOUDINARY_API_KEY=<your_api_key>
   CLOUDINARY_API_SECRET=<your_api_secret>
   NODE_ENV=production
   ```

4. **Deploy**: Click "Create Web Service"

5. **Note Your Backend URL**: e.g., `https://your-app.onrender.com`

### Frontend Deployment (Netlify)

1. **Build the Frontend**:
   ```bash
   cd Frontend
   npm run build
   ```

2. **Update Environment Variable**:
   Create `.env.production`:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

3. **Deploy to Netlify**:
   - Sign up at [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect GitHub repository

4. **Configure Build Settings** (if using GitHub):
   - **Base directory**: Frontend
   - **Build command**: `npm run build`
   - **Publish directory**: Frontend/dist

5. **Add Environment Variables** in Netlify:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

### Alternative: Frontend Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd Frontend
   vercel
   ```

3. **Add Environment Variables** in Vercel Dashboard:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

## 🔒 CORS Configuration

The backend is configured to accept requests from any origin. For production, update the CORS configuration in `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

## 🎨 Customization

### Changing Colors
Edit `Frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Changing Image Aspect Ratio
Edit `Frontend/src/components/ImageCropper.jsx`:
```javascript
<ImageCropper aspectRatio={16/9} /> // Change to desired ratio
```

## 🧪 Testing

### Test Backend Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Get all projects
curl http://localhost:5000/api/projects

# Get all clients
curl http://localhost:5000/api/clients
```

### Test Frontend
1. Open `http://localhost:3000`
2. Navigate through all sections
3. Submit contact form
4. Subscribe to newsletter
5. Visit `/admin` to test admin panel

## 📝 Database Schema

### Projects Collection
```javascript
{
  name: String (required),
  description: String (required),
  image: String (required - Cloudinary URL),
  createdAt: Date (auto)
}
```

### Clients Collection
```javascript
{
  name: String (required),
  designation: String (required),
  description: String (required),
  image: String (required - Cloudinary URL),
  createdAt: Date (auto)
}
```

### ContactForms Collection
```javascript
{
  fullName: String (required),
  email: String (required),
  mobile: String (required),
  city: String (required),
  createdAt: Date (auto)
}
```

### NewsletterSubscribers Collection
```javascript
{
  email: String (required, unique),
  createdAt: Date (auto)
}
```

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Check your connection string and network access in MongoDB Atlas
- **Cloudinary Upload Error**: Verify your Cloudinary credentials
- **CORS Error**: Ensure CORS is enabled in backend

### Frontend Issues
- **API Connection Error**: Check `VITE_API_URL` in `.env`
- **Image Upload Error**: Ensure file size is under 5MB
- **Build Error**: Clear `node_modules` and reinstall dependencies

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


# Real-Trust
