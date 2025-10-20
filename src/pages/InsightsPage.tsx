import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import BlogLayout from '../components/BlogLayout';
import { getAllPosts, getFeaturedPosts } from '../data/blogPosts';

const InsightsPage: React.FC = () => {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="insights"
        customTitle="Retailstar Insights | Web3 Domain Strategy & Solana Ecosystem"
        customDescription="Deep insights into Solana domain strategy, Web3 marketplace trends, and the future of digital storefronts. Learn from the Retailstar ecosystem."
        customKeywords="solana domain insights, web3 marketplace strategy, domain development, retailstar ecosystem, solana domain trends"
        canonicalUrl="https://retailstar.xyz/insights"
      />
      
      <BlogLayout>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
            📝 Retailstar Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Deep dives into the Solana ecosystem, domain strategy, and the future of Web3 marketplaces. 
            From technical breakdowns to cultural analysis.
          </p>
        </div>

        {/* Featured Article */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Featured Article</h2>
            <div className="bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {featuredPosts[0].title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {featuredPosts[0].description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                    <span>{new Date(featuredPosts[0].publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{featuredPosts[0].author.name}</span>
                    <span>•</span>
                    <span>{featuredPosts[0].category}</span>
                  </div>
                  <Link 
                    to={`/insights/${featuredPosts[0].slug}`}
                    className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Read Article →
                  </Link>
                </div>
                {featuredPosts[0].image && (
                  <div className="w-32 h-32 flex-shrink-0">
                    <img 
                      src={featuredPosts[0].image} 
                      alt={featuredPosts[0].title}
                      className="w-full h-full object-cover rounded-lg border border-cyan-500/30"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">All Articles</h2>
          <div className="grid gap-6">
            {allPosts.map((post) => (
              <article key={post.slug} className="bg-black/20 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      <Link 
                        to={`/insights/${post.slug}`}
                        className="hover:text-cyan-300 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {post.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <span>{post.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={`/insights/${post.slug}`}
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                  {post.image && (
                    <div className="w-24 h-24 flex-shrink-0 ml-4">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg border border-gray-600"
                      />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Want to Contribute?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Have insights about Solana domains, Web3 marketplaces, or digital storefronts? 
            We're always looking for quality content from the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Article
            </Link>
            <Link 
              to="/contact"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </BlogLayout>
    </>
  );
};

export default InsightsPage;
