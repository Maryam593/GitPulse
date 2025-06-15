import { useState } from 'react';
import axios from 'axios';
import { Bars3BottomRightIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGitHubStats = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/github-stats/${username}`);
      setUserData({
        ...response.data,
        stats: response.data.stats
      });
    } catch (err) {
      setError('Failed to fetch GitHub stats. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          GitPulse - Track your GitHub life <span className="text-green-500">🫀</span>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Generate Dashboard'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-red-50 border-l-4 border-red-400">
            <div className="flex">
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
                      className="h-24 w-24 rounded-full border-4 border-green-500"
                      src={userData.avatar_url}
                      alt={`${userData.username}'s avatar`}
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
                      className="mt-1 text-green-400 hover:text-green-300 inline-flex items-center"
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
                      src={`https://github-readme-stats.vercel.app/api?username=${userData.username}&show_icons=true&theme=dark`} 
                      alt="GitHub Stats" 
                      className="w-full h-auto"
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
                      src={`https://github-readme-streak-stats.herokuapp.com?user=${userData.username}&theme=dark`} 
                      alt="GitHub Streak" 
                      className="w-full h-auto"
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
                      src={`https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=${userData.username}&layout=compact&theme=dark`} 
                      alt="Top Languages" 
                      className="w-full h-auto"
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
                      src={`https://ghchart.rshah.org/${userData.username}`} 
                      alt="GitHub Contribution Heatmap" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* GitHub Trophies */}
              <div className="bg-gray-800 overflow-hidden shadow rounded-lg md:col-span-2">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-white mb-4">GitHub Trophies</h3>
                  <div 
                    className="w-full overflow-hidden rounded-lg"
                    dangerouslySetInnerHTML={{ __html: userData.stats.trophies }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
