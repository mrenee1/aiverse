# AIverse - AI Tools Directory

A comprehensive free web application that showcases 1,000+ AI tools in a searchable, categorized format. Built with React, Node.js, and MongoDB.

## 🚀 Features

### Core Functionality
- **1,000+ AI Tools**: Comprehensive directory of AI tools across 25+ categories
- **Advanced Search**: Full-text search with filtering and sorting capabilities
- **Category Browsing**: Organized categories with expandable subcategories
- **Tool Details**: Detailed pages with screenshots, logos, and metadata
- **Free Tool Submission**: Anyone can submit new AI tools for review
- **Responsive Design**: Mobile-first design with modern UI

### Technical Features
- **Auto-generated Content**: Fetches data from GitHub repositories and AI directories
- **Logo Integration**: Uses Clearbit API for tool logos
- **Screenshot Service**: Integrates Thum.io for website screenshots
- **Pagination**: Efficient data loading with pagination
- **Real-time Search**: Instant search results with debouncing
- **Open Tool Submission**: Anyone can submit AI tools without registration

## 🛠 Tech Stack

### Frontend
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Styled Components**: CSS-in-JS styling
- **Lucide React**: Modern icon library
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
- **Bcrypt**: Password hashing

### External APIs
- **Clearbit Logo API**: Tool logos
- **Thum.io**: Website screenshots
- **GitHub API**: Repository data fetching

## 📋 Categories

The directory includes AI tools in these categories:
- Artificial Intelligence
- Productivity
- Marketing
- Developer Tools
- Design
- SEO
- Chatbots
- Social Media
- Content Creation
- No Code
- Writing
- Customer Support
- Blogging
- Sales
- Productized Services
- Website Builders
- Analytics
- iOS
- Developer APIs
- Video
- Building Products
- Mac
- Feedback Tools
- Education
- Email

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aiverse
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/aiverse
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   CLEARBIT_API_KEY=your_clearbit_api_key
   THUMIO_API_KEY=your_thumio_api_key
   ```

4. **Database Setup**
   
   Start MongoDB:
   ```bash
   # For local MongoDB
   mongod
   
   # Or use MongoDB Atlas
   # Update MONGODB_URI in .env with your Atlas connection string
   ```

5. **Seed Database**
   ```bash
   cd backend
   npm run seed
   ```

### Running the Application

1. **Development Mode**
   ```bash
   # From root directory
   npm run dev
   ```
   
   This will start both frontend (port 3000) and backend (port 5000) concurrently.

2. **Individual Services**
   ```bash
   # Backend only
   npm run server
   
   # Frontend only
   npm run client
   ```

3. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
aiverse/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── scripts/         # Data fetching and seeding
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # React contexts
│   │   ├── pages/       # Page components
│   │   ├── App.js      # Main App component
│   │   └── index.js    # Entry point
│   ├── public/
│   └── package.json
├── package.json         # Root package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens
- `CLIENT_URL`: Frontend URL for CORS
- `CLEARBIT_API_KEY`: Clearbit API key (optional)
- `THUMIO_API_KEY`: Thum.io API key (optional)

### Data Sources

The application fetches AI tools data from:
- GitHub repositories (primary source)
- AI tool directories
- Public APIs
- Generated sample data (fallback)

## 🎨 Design System

### Typography
- **Headings**: Poppins font family
- **Body Text**: Inter font family
- **Google Fonts**: Integrated via CDN

### Color Palette
- **Primary**: #3b82f6 (Blue)
- **Secondary**: #64748b (Slate)
- **Background**: #f8fafc (Light)
- **White**: #ffffff
- **Border**: #e2e8f0

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📊 API Endpoints

### Tools
- `GET /api/tools` - Get all tools with pagination
- `GET /api/tools/:id` - Get tool by ID
- `GET /api/tools/categories/list` - Get all categories
- `GET /api/tools/featured/list` - Get featured tools
- `GET /api/tools/product-of-the-day/today` - Get product of the day
- `GET /api/tools/search/query` - Search tools

### Submissions
- `POST /api/submissions` - Submit new tool (open to everyone)
- `GET /api/submissions/pending` - Get pending submissions (public view)
- `PUT /api/submissions/:id/approve` - Approve submission (open endpoint)
- `DELETE /api/submissions/:id` - Reject submission (open endpoint)

## 🎯 Free Access Model

- **No Registration Required**: Browse and search all AI tools freely
- **Open Tool Submission**: Anyone can submit AI tools without creating an account
- **Public Review Process**: All submissions are visible and can be reviewed
- **No Authentication**: Simplified user experience with no barriers to entry

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd backend
npm start
# Set environment variables in deployment platform
```

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Update `MONGODB_URI` in environment
3. Ensure IP whitelist allows connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify network connectivity

2. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

3. **CORS Issues**
   - Check CLIENT_URL in backend .env
   - Ensure frontend URL matches

4. **Data Seeding Fails**
   - Check internet connection for GitHub API calls
   - Verify MongoDB connection
   - Run with verbose logging

### Getting Help

- Check the console for error messages
- Verify all environment variables are set
- Ensure all dependencies are installed
- Check MongoDB connection status

## 📈 Performance

### Optimization Features
- **Image Lazy Loading**: Screenshots load on scroll
- **API Debouncing**: Search requests are debounced
- **Pagination**: Efficient data loading
- **Caching**: Browser and API caching
- **Code Splitting**: React lazy loading

### Monitoring
- **API Response Times**: Logged in development
- **Database Queries**: Optimized with indexes
- **Bundle Size**: Analyzed with webpack-bundle-analyzer

## 🔮 Future Features

- [ ] Advanced filtering options
- [ ] User favorites and collections
- [ ] Tool comparison feature
- [ ] Newsletter subscription
- [ ] API rate limiting
- [ ] Tool analytics dashboard
- [ ] Social sharing features
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Mobile app

---

Built with ❤️ by the AIverse team
