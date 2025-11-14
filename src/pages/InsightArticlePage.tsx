import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import BlogLayout from '../components/BlogLayout';
import { getBlogPost } from '../data/blogPosts';
import rsopengraph from '../assets/rsopengraph.png';

const InsightArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <>
        <SEOHead 
          target="retailstar.sol"
          pageType="article"
          customTitle="Article Not Found | Retailstar Insights"
          customDescription="This article doesn't exist in our insights collection."
          canonicalUrl="https://retailstar.xyz/insights/not-found"
        />
        
        <BlogLayout>
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-gray-300 mb-8">This article doesn't exist in our insights collection.</p>
            <Link 
              to="/insights" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse All Articles
            </Link>
          </div>
        </BlogLayout>
      </>
    );
  }

  // Convert markdown-like content to HTML
  const formatContent = (content: string) => {
    // Handle markdown tables first (before other processing)
    const tableRegex = /(\|.+\|\n\|[\s\-:]+\|\n(?:\|.+\|\n?)+)/g;
    let processed = content.replace(tableRegex, (match) => {
      const lines = match.trim().split('\n');
      const headerRow = lines[0];
      const dataRows = lines.slice(2); // Skip separator row
      
      const headerCells = headerRow.split('|').map(c => c.trim()).filter(c => c);
      const headerHtml = `<thead><tr>${headerCells.map(cell => `<th class="border border-gray-700 px-4 py-2 text-left font-bold text-white bg-gray-800">${cell}</th>`).join('')}</tr></thead>`;
      
      const bodyRows = dataRows.map(row => {
        const cells = row.split('|').map(c => c.trim()).filter(c => c);
        return `<tr>${cells.map(cell => `<td class="border border-gray-700 px-4 py-2 text-gray-300">${cell}</td>`).join('')}</tr>`;
      }).join('');
      
      return `<table class="w-full border-collapse border border-gray-700 my-6">${headerHtml}<tbody>${bodyRows}</tbody></table>`;
    });
    
    // Handle links - detect internal vs external
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, (match, text, url) => {
      const isInternal = url.startsWith('/') || url.startsWith('#');
      const isExternal = url.startsWith('http://') || url.startsWith('https://');
      const linkClass = 'text-cyan-400 hover:text-cyan-300 underline';
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}" class="${linkClass}"${target}>${text}</a>`;
    });
    
    return processed
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mb-6">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-cyan-400 mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mb-3 mt-6">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-gray-300 mb-2 mt-4">$1</h4>')
      .replace(/^\* (.*$)/gim, '<li class="text-gray-300 mb-1">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="text-gray-300 mb-1">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="text-gray-300 mb-1">$1</li>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="text-gray-300 italic">$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-gray-800 text-cyan-300 px-2 py-1 rounded text-sm">$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-cyan-500 pl-4 italic text-cyan-300 my-4">$1</blockquote>')
      .replace(/^---$/gim, '<hr class="border-gray-700 my-8">')
      .replace(/\n\n/gim, '</p><p class="text-gray-300 leading-relaxed mb-4">')
      .replace(/^(?!<[h|l|b|c|a|p|t])(.*$)/gim, '<p class="text-gray-300 leading-relaxed mb-4">$1</p>');
  };

  const formattedContent = formatContent(post.content);

  // Generate comprehensive schema for blog posts
  // Use Person type for Kongnificent, Organization for others
  const isKongnificent = post.author.name === 'Kongnificent';
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.schema.articleType,
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "author": isKongnificent ? {
      "@type": "Person",
      "name": post.author.name
    } : {
      "@type": "Organization",
      "name": post.author.name,
      "url": post.author.url
    },
    "publisher": {
      "@type": "Organization",
      "name": "Retailstar Mall",
      "logo": {
        "@type": "ImageObject",
        "url": "https://retailstar.xyz/assets/rs-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.canonicalUrl
    },
    "datePublished": post.publishedAt,
    "articleBody": post.content,
    "keywords": Array.isArray(post.keywords) ? post.keywords : (post.keywords || '').split(',').map(k => k.trim()),
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length,
    "inLanguage": "en-US"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://retailstar.xyz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": "https://retailstar.xyz/insights"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": post.canonicalUrl
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": post.title,
    "description": post.description,
    "url": post.canonicalUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Retailstar.sol",
      "url": "https://retailstar.xyz"
    },
    "about": {
      "@type": "Thing",
      "name": post.schema.mainEntity || "Retailstar Ecosystem"
    }
  };

  return (
    <>
      <SEOHead 
        target={post.slug}
        pageType="article"
        customTitle={post.title}
        customDescription={post.description}
        customKeywords={Array.isArray(post.keywords) ? post.keywords.join(', ') : post.keywords}
        canonicalUrl={post.canonicalUrl}
        imageUrl={post.image}
        customSchema={articleSchema}
        additionalSchema={[breadcrumbSchema, webPageSchema]}
      />
      
      <BlogLayout post={post} showSidebar={true}>
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-cyan-300">Home</Link></li>
            <li>/</li>
            <li><Link to="/insights" className="hover:text-cyan-300">Insights</Link></li>
            <li>/</li>
            <li className="text-gray-300">{post.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {post.description}
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400 mb-6">
            <span>By {post.author.name}</span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span>•</span>
            <span>{post.category}</span>
            <span>•</span>
            <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Image */}
        {post.image && (
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg border border-gray-700"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = rsopengraph;
              }}
            />
          </div>
        )}

        {/* Article Content */}
        <article 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">About the Author</h3>
              <p className="text-gray-300">
                {post.author.name} is part of the Retailstar team, building the future of Web3 domain marketplaces.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 mb-2">Published</p>
              <p className="text-sm text-gray-300">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              {post.updatedAt !== post.publishedAt && (
                <>
                  <p className="text-sm text-gray-400 mb-2 mt-2">Updated</p>
                  <p className="text-sm text-gray-300">
                    {new Date(post.updatedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Share this article:</span>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.canonicalUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Twitter
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.canonicalUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </footer>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="text-xl font-bold text-cyan-400 mb-6">More Insights</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-white mb-2">Domain Strategy Guide</h4>
              <p className="text-gray-300 text-sm mb-3">
                Learn how to choose and develop Solana domains for maximum impact.
              </p>
              <Link 
                to="/guide"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
              >
                Read Guide →
              </Link>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-white mb-2">Browse Domains</h4>
              <p className="text-gray-300 text-sm mb-3">
                Explore our curated collection of Solana domains ready for development.
              </p>
              <Link 
                to="/directory"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
              >
                Browse Now →
              </Link>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-bold text-white mb-2">Domain Tools</h4>
              <p className="text-gray-300 text-sm mb-3">
                Test domains, find your archetype, and discover trending picks.
              </p>
              <Link 
                to="/tools"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
              >
                Try Tools →
              </Link>
            </div>
          </div>
        </div>
      </BlogLayout>
    </>
  );
};

export default InsightArticlePage;
