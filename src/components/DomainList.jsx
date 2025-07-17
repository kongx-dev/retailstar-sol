import React, { useState, useEffect } from 'react';
import { fetchAirtableDomains } from '../lib/fetchAirtableDomains';

const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDomains = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAirtableDomains();
        setDomains(data);
      } catch (err) {
        console.error('Error loading domains:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDomains();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading domains...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Domains</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!domains || domains.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-300 mb-4">No Domains Found</h2>
          <p className="text-gray-400">No domains are currently available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 solana-gradient">
          Airtable Domains
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((record) => (
            <div 
              key={record.id} 
              className="bg-neutral-900 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-colors"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">
                  {record.fields.name || 'Unnamed Domain'}
                </h3>
                {record.fields.description && (
                  <p className="text-gray-300 text-sm mb-3">
                    {record.fields.description}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {record.fields.price && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-green-400 font-semibold">{record.fields.price}</span>
                  </div>
                )}
                
                {record.fields.status && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      record.fields.status === 'available' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-white'
                    }`}>
                      {record.fields.status}
                    </span>
                  </div>
                )}

                {record.fields.category && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-purple-400">{record.fields.category}</span>
                  </div>
                )}

                {record.fields.website && (
                  <div className="pt-3">
                    <a 
                      href={record.fields.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded transition-colors"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              {/* Display any other fields */}
              {Object.keys(record.fields).map((fieldName) => {
                const excludedFields = ['name', 'description', 'price', 'status', 'category', 'website'];
                if (excludedFields.includes(fieldName)) return null;
                
                return (
                  <div key={fieldName} className="flex justify-between pt-2 border-t border-gray-700">
                    <span className="text-gray-400 capitalize">{fieldName}:</span>
                    <span className="text-gray-300">{String(record.fields[fieldName])}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainList; 