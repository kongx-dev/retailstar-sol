import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../data/blogPosts';

interface BlogLayoutProps {
  children: React.ReactNode;
  post?: BlogPost;
  showSidebar?: boolean;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ 
  children, 
  post, 
  showSidebar = false 
}) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/40 backdrop-blur-sm py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">RS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              RetailStar
            </span>
          </Link>
          <nav className="flex space-x-6">
            <Link to="/insights" className="text-cyan-300 hover:text-white font-semibold transition-colors">
              📝 Insights
            </Link>
            <Link to="/directory" className="text-gray-300 hover:text-white transition-colors">
              Directory
            </Link>
            <Link to="/domains" className="text-gray-300 hover:text-white transition-colors">
              Domains
            </Link>
            <Link to="/vault" className="text-gray-300 hover:text-white transition-colors">
              Vault
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <main className={`${showSidebar ? 'flex-1 max-w-4xl' : 'w-full max-w-4xl mx-auto'}`}>
            {children}
          </main>

          {/* Sidebar */}
          {showSidebar && (
            <aside className="w-80 flex-shrink-0">
              <div className="sticky top-8 space-y-6">
                {/* Table of Contents */}
                {post && (
                  <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-cyan-400 mb-3">Table of Contents</h3>
                    <nav className="space-y-2">
                      <a href="#origin-story" className="block text-gray-300 hover:text-cyan-300 text-sm">
                        The Origin Story
                      </a>
                      <a href="#what-is-retailstar" className="block text-gray-300 hover:text-cyan-300 text-sm">
                        What Is Retailstar?
                      </a>
                      <a href="#ecosystem" className="block text-gray-300 hover:text-cyan-300 text-sm">
                        Explore the Ecosystem
                      </a>
                      <a href="#archetypes" className="block text-gray-300 hover:text-cyan-300 text-sm">
                        Domain Archetypes
                      </a>
                      <a href="#features" className="block text-gray-300 hover:text-cyan-300 text-sm">
                        Upcoming Features
                      </a>
                      <a href="#join-movement" className="block text-gray-300 hover:text-cyan-300 text-sm">
                        Join the Movement
                      </a>
                    </nav>
                  </div>
                )}

                {/* Related Content */}
                <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-cyan-400 mb-3">Explore More</h3>
                  <div className="space-y-3">
                    <Link 
                      to="/directory" 
                      className="block text-gray-300 hover:text-cyan-300 text-sm transition-colors"
                    >
                      🗺️ Browse Domain Directory
                    </Link>
                    <Link 
                      to="/domains" 
                      className="block text-gray-300 hover:text-cyan-300 text-sm transition-colors"
                    >
                      🛍️ Shop Available Domains
                    </Link>
                    <Link 
                      to="/vault" 
                      className="block text-gray-300 hover:text-cyan-300 text-sm transition-colors"
                    >
                      🔓 Explore the Vault
                    </Link>
                    <Link 
                      to="/guide" 
                      className="block text-gray-300 hover:text-cyan-300 text-sm transition-colors"
                    >
                      📖 Navigation Guide
                    </Link>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-cyan-400 mb-3">Ready to Build?</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Got a fire .sol domain? Let's turn it into something legendary.
                  </p>
                  <div className="space-y-2">
                    <Link 
                      to="/submit" 
                      className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white text-center py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Submit Your Domain
                    </Link>
                    <Link 
                      to="/services" 
                      className="block w-full bg-pink-600 hover:bg-pink-700 text-white text-center py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Request Custom Build
                    </Link>
                  </div>
                </div>

                {/* Social Share */}
                {post && (
                  <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-cyan-400 mb-3">Share This Article</h3>
                    <div className="flex space-x-3">
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.canonicalUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Twitter
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.canonicalUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
