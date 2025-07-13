import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: ['https://git-pulse.vercel.app', 'https://localhost:5173'], // Vercel site ka origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// API Route to fetch GitHub stats
app.get('/api/github-stats/:username', async (req, res) => {
    const { username } = req.params;
    
    if (!username) {
        return res.status(400).json({ error: 'GitHub username is required' });
    }

    try {
        const [profileRes, statsRes, streakRes, langRes, heatmapRes, trophiesRes] = await Promise.all([
            axios.get(`https://api.github.com/users/${username}`),
            axios.get(`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark`),
            axios.get(`https://github-readme-streak-stats.herokuapp.com?user=${username}&theme=dark`),
            axios.get(`https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark`),
            axios.get(`https://ghchart.rshah.org/${username}`),
            axios.get(`https://github-profile-trophy.vercel.app/?username=${username}`, { 
                responseType: 'text',
                headers: { 'Accept': 'text/html' }
            })
        ]);

        res.json({
            success: true,
            username,
            avatar_url: profileRes.data.avatar_url,
            stats: {
                githubStats: statsRes.data,
                streakStats: streakRes.data,
                topLangs: langRes.data,
                heatmap: heatmapRes.data,
                trophies: trophiesRes.data
            }
        });
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch GitHub stats',
            details: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
