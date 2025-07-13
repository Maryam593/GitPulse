<div align="center">
  <h1>GitPulse</h1>
  <p>📊 A beautiful GitHub stats tracker with a modern dark theme</p>
  [![Netlify Status](https://api.netlify.com/api/v1/badges/5775456f-39db-4ea5-8cf7-134370a06ce5/deploy-status)](https://app.netlify.com/projects/gitbeat/deploys)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
</div>

## ✨ Features

- 🎨 **Modern Dark Theme**: Sleek, GitHub-inspired dark interface that's easy on the eyes
- 📊 **Comprehensive Stats**: Detailed GitHub statistics including stars, commits, and more
- 🏆 **Profile Trophies**: Show off your GitHub achievements with beautiful trophy display
- 📈 **Streak Stats**: Track your coding streak and contributions over time
- 🌟 **Top Languages**: Visualize your most used programming languages
- 🗓 **Contribution Heatmap**: Interactive heatmap of your GitHub activity
- ⚡ **Lightning Fast**: Optimized for performance with minimal loading times
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices

## 🎥 Demo

[![GitPulse Demo](https://github.com/user-attachments/assets/40bc2818-5165-4e3f-b934-9a213491cf77)](https://your-demo-url.com)

*Click the image above to view a live demo (if available)*

## 🔍 Preview

```
+------------------------+     +------------------------+
|   GitHub Username     |     |     User Dashboard     |
|   [             ]     | --> |                        |
|   [Generate Dashboard] |     | 1. Profile Card        |
+------------------------+     | 2. GitHub Stats       |
                               | 3. Streak Stats        |
                               | 4. Top Languages       |
                               | 5. Contribution Graph  |
                               | 6. GitHub Trophies     |
                               +------------------------+
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Maryam593/GitPulse.git
   cd GitPulse
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

### Frontend
- ⚛️ **React** - JavaScript library for building user interfaces
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- ✨ **Hero Icons** - Beautiful hand-crafted SVG icons
- 🔄 **Axios** - Promise-based HTTP client
- 🔄 **React Icons** - Popular icons for React applications

### Backend
- 🚀 **Node.js** - JavaScript runtime
- 🌐 **Express** - Web application framework
- 🔄 **Axios** - For making HTTP requests to GitHub API
- 🔒 **CORS** - Middleware for enabling CORS

## 🌐 API Endpoints

### `GET /api/github-stats/:username`
Fetches GitHub statistics for the specified username.

**Response:**
```json
{
  "username": "octocat",
  "avatar_url": "https://avatars.githubusercontent.com/u/...",
  "stats": {
    "trophies": "<svg>...</svg>",
    "github_stats": "<svg>...</svg>",
    "streak_stats": "<svg>...</svg>",
    "top_languages": "<svg>...</svg>"
  }
}
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 🐛 Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/Maryam593/GitPulse/issues) to report any bugs or file feature requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub API for providing the data
- GitHub Readme Stats for the stats cards
- GitHub Profile Trophy for the trophy display

## 📝 Notes

- This project is for educational purposes and personal use.
- Make sure to respect GitHub's API rate limits.
- Feel free to contribute or suggest improvements!
