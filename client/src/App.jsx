import { useState } from 'react';
import { Bars3BottomRightIcon } from '@heroicons/react/24/outline';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Fetches GitHub statistics for a given username.
   * This function now directly fetches the user's avatar from GitHub API
   * and constructs URLs for other stats images, rather than relying on Gemini API
   * to fetch all external content. Gemini API is still used for structured data
   * if needed, but for direct image/SVG URLs, client-side construction is more reliable.
   * @param {Event} e - The form submission event.
   */
  const fetchGitHubStats = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      // 1. Fetch user profile data directly from GitHub API for avatar_url
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!profileResponse.ok) {
        if (profileResponse.status === 404) {
          throw new Error('GitHub user not found. Please check the username.');
        }
        throw new Error(`Failed to fetch GitHub profile: ${profileResponse.statusText}`);
      }
      const profileData = await profileResponse.json();
      const avatarUrl = profileData.avatar_url;

      // 2. Construct URLs for all stats images/SVGs directly
      const githubStatsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark`;
      const streakStatsUrl = `https://github-readme-streak-stats.herokuapp.com?user=${username}&theme=dark`;
      const topLangsUrl = `https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark`;
      const heatmapUrl = `https://ghchart.rshah.org/${username}`;
      const trophiesUrl = `https://github-profile-trophy.vercel.app/?username=${username}`; // This URL directly provides the SVG

      // Update the state with the fetched avatar and constructed stats URLs
      setUserData({
        username: username, // Use the input username
        avatar_url: avatarUrl,
        stats: {
          githubStatsUrl: githubStatsUrl,
          streakStatsUrl: streakStatsUrl,
          topLangsUrl: topLangsUrl,
          heatmapUrl: heatmapUrl,
          trophiesUrl: trophiesUrl // Now storing the URL, not the SVG content
        }
      });

    } catch (err) {
      setError(`Failed to fetch GitHub stats: ${err.message}. Please try again.`);
      console.error('Error fetching GitHub stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
        body { font-family: 'Inter', sans-serif; }
        .rounded-lg { border-radius: 0.5rem; }
        .shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
        .border-green-600 { border-color: #059669; }
        .bg-green-700 { background-color: #047857; }
        .hover\\:bg-green-800:hover { background-color: #065F46; }
        .focus\\:ring-green-600:focus { --tw-ring-color: #059669; }
        .text-green-600 { color: #059669; }
        .text-green-500 { color: #10B981; }
        .hover\\:text-green-400:hover { color: #34D399; }
        .bg-gray-800 { background-color: #1F2937; }
        .bg-gray-900 { background-color: #111827; }
        .border-gray-300 { border-color: #D1D5DB; }
        .text-gray-300 { color: #D1D5DB; }
        .text-gray-400 { color: #9CA3AF; }
        .text-gray-500 { color: #6B7280; }
        .text-gray-700 { color: #374151; }
        .text-gray-900 { color: #111827; }
        .bg-red-50 { background-color: #FEF2F2; }
        .border-red-400 { border-color: #F87171; }
        .text-red-400 { color: #F87171; }
        .text-red-700 { color: #B91C1C; }
        .disabled\\:opacity-50:disabled { opacity: 0.5; }
        .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
        `}
      </style>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          GitPulse - Track your GitHub life <span className="text-green-600">🫀</span>
        </h1>

        {/* Search Form */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={fetchGitHubStats} className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 bg-white text-gray-900 placeholder-gray-500"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Generate Dashboard'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-50 border-l-4 border-red-400 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bars3BottomRightIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {userData && (
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-6 py-8 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <img
                      className="h-24 w-24 rounded-full border-4 border-green-600 object-cover"
                      src={userData.avatar_url}
                      alt={`${userData.username}'s avatar`}
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/6B7280/FFFFFF?text=${userData.username.charAt(0).toUpperCase()}`; }} // Fallback image
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {userData.username}
                    </h2>
                    <a
                      href={`https://github.com/${userData.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-green-500 hover:text-green-400 inline-flex items-center"
                    >
                      @{userData.username}
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GitHub Stats */}
              <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-white mb-4">GitHub Stats</h3>
                  <div className="w-full overflow-hidden rounded-lg">
                    <img
                      src={userData.stats.githubStatsUrl}
                      alt="GitHub Stats"
                      className="w-full h-auto"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x150/6B7280/FFFFFF?text=Stats+Unavailable`; }}
                    />
                  </div>
                </div>
              </div>

              {/* Streak Stats */}
              <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Streak Stats</h3>
                  <div className="w-full overflow-hidden rounded-lg">
                    <img
                      src={userData.stats.streakStatsUrl}
                      alt="GitHub Streak"
                      className="w-full h-auto"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x150/6B7280/FFFFFF?text=Streak+Unavailable`; }}
                    />
                  </div>
                </div>
              </div>

              {/* Top Languages */}
              <div className="bg-gray-800 overflow-hidden shadow rounded-lg md:col-span-2">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Top Languages</h3>
                  <div className="w-full overflow-hidden rounded-lg">
                    <img
                      src={userData.stats.topLangsUrl}
                      alt="Top Languages"
                      className="w-full h-auto"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x200/6B7280/FFFFFF?text=Languages+Unavailable`; }}
                    />
                  </div>
                </div>
              </div>

              {/* Contribution Heatmap */}
              <div className="bg-gray-800 overflow-hidden shadow rounded-lg md:col-span-2">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Contribution Heatmap</h3>
                  <div className="w-full overflow-hidden rounded-lg">
                    <img
                      src={userData.stats.heatmapUrl}
                      alt="GitHub Contribution Heatmap"
                      className="w-full h-auto"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x250/6B7280/FFFFFF?text=Heatmap+Unavailable`; }}
                    />
                  </div>
                </div>
              </div>

              {/* GitHub Trophies */}
              <div className="bg-gray-800 overflow-hidden shadow rounded-lg md:col-span-2">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-white mb-4">GitHub Trophies</h3>
                  <div
                    className="w-full overflow-hidden rounded-lg flex justify-center items-center"
                  >
                    <img
                      src={userData.stats.trophiesUrl} // Now using the URL directly
                      alt="GitHub Trophies"
                      className="w-full h-auto"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x100/6B7280/FFFFFF?text=Trophies+Unavailable`; }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
