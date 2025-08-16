'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function AnalyticsPage() {
  const [overview, setOverview] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postAnalytics, setPostAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch overview data
      const overviewRes = await fetch('/api/analytics/overview');
      const overviewData = await overviewRes.json();
      setOverview(overviewData);

      // Fetch posts data
      const postsRes = await fetch('/api/analytics/posts');
      const postsData = await postsRes.json();
      setPosts(postsData.posts || []);

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostAnalytics = async (slug) => {
    try {
      const res = await fetch(`/api/analytics/posts?slug=${slug}&days=${timeRange}`);
      const data = await res.json();
      setPostAnalytics(data);
    } catch (error) {
      console.error('Error fetching post analytics:', error);
    }
  };

  const handlePostSelect = (slug) => {
    setSelectedPost(slug);
    fetchPostAnalytics(slug);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-spin border-t-white mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400 mx-auto"></div>
          </div>
          <div className="text-2xl font-bold text-white mb-2">Loading Analytics</div>
          <div className="text-gray-400">Fetching your data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Track your content performance and audience insights
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: "Total Views",
              value: formatNumber(overview?.totalViews || 0),
              icon: "👁️",
              color: "from-blue-500 to-blue-700",
              bgGradient: "from-blue-500/20 to-blue-700/20"
            },
            {
              title: "Unique Visitors Today",
              value: overview?.uniqueVisitorsToday || 0,
              icon: "👥",
              color: "from-green-500 to-green-700",
              bgGradient: "from-green-500/20 to-green-700/20"
            },
            {
              title: "Total Posts",
              value: posts.length,
              icon: "📝",
              color: "from-purple-500 to-purple-700",
              bgGradient: "from-purple-500/20 to-purple-700/20"
            }
          ].map((card, index) => (
            <div
              key={card.title}
              className={`group relative overflow-hidden rounded-2xl border-2 border-white/20 bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm hover:border-white/40 transition-all duration-500 transform hover:scale-105 p-8`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{card.icon}</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">{card.title}</h3>
                <p className={`text-4xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Top Performing Posts */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:border-white/40 transition-all duration-500 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🏆</span>
                <h3 className="text-2xl font-bold text-white">Top Performing Posts</h3>
              </div>

              <div className="space-y-4">
                {overview?.topPosts?.map((post, index) => (
                  <div key={post.slug} className="group/item flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-white/20 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-white group-hover/item:text-gray-200 transition-colors max-w-xs truncate">
                        {post.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {formatNumber(post.count)}
                      </span>
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Device Distribution */}
          <div className="group relative overflow-hidden rounded-2xl border-2 border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:border-white/40 transition-all duration-500 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📱</span>
                <h3 className="text-2xl font-bold text-white">Device Distribution</h3>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={Object.entries(overview?.deviceDistribution || {}).map(([device, count]) => ({
                      name: device,
                      value: count
                    }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {Object.entries(overview?.deviceDistribution || {}).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Posts Analytics Table */}
        <div className="group relative overflow-hidden rounded-2xl border-2 border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:border-white/40 transition-all duration-500 p-8 mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <h3 className="text-2xl font-bold text-white">Posts Analytics</h3>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(parseInt(e.target.value))}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white backdrop-blur-sm focus:outline-none focus:border-white/40 transition-all duration-300"
                >
                  <option value={7} className="bg-gray-800">Last 7 days</option>
                  <option value={30} className="bg-gray-800">Last 30 days</option>
                  <option value={90} className="bg-gray-800">Last 90 days</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="min-w-full">
                <thead className="bg-white/5">
                  <tr>
                    {['Post', 'Total Views', `Recent Views (${timeRange} days)`, 'Recent Unique', 'Actions'].map((header) => (
                      <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {posts.map((post, index) => (
                    <tr key={post.slug} className="hover:bg-white/5 transition-colors duration-300">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">
                          {post.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-blue-400">
                          {formatNumber(post.count)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">{post.recentViews}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-300">{post.recentUniqueViews}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handlePostSelect(post.slug)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                        >
                          <span>View Details</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Individual Post Analytics */}
        {selectedPost && postAnalytics && (
          <div className="group relative overflow-hidden rounded-2xl border-2 border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:border-white/40 transition-all duration-500 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔍</span>
                  <h3 className="text-2xl font-bold text-white">
                    Analytics for: {selectedPost.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white hover:text-gray-300 transition-all duration-300"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Daily Views Chart */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <span>📈</span>
                    Daily Views ({timeRange} days)
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={Object.entries(postAnalytics.dailyData || {}).map(([date, data]) => ({
                      date,
                      total: data.total,
                      unique: data.unique
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="date" stroke="#fff" fontSize={12} />
                      <YAxis stroke="#fff" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} />
                      <Line type="monotone" dataKey="unique" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Device & Browser Distribution */}
                <div className="space-y-6">
                  {/* Device Types */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span>📱</span>
                      Device Types
                    </h5>
                    <ResponsiveContainer width="100%" height={150}>
                      <BarChart data={Object.entries(postAnalytics.deviceDistribution || {}).map(([device, count]) => ({
                        device,
                        count
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="device" stroke="#fff" fontSize={12} />
                        <YAxis stroke="#fff" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Browsers */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span>🌐</span>
                      Browsers
                    </h5>
                    <ResponsiveContainer width="100%" height={150}>
                      <BarChart data={Object.entries(postAnalytics.browserDistribution || {}).map(([browser, count]) => ({
                        browser,
                        count
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="browser" stroke="#fff" fontSize={12} />
                        <YAxis stroke="#fff" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                        />
                        <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}