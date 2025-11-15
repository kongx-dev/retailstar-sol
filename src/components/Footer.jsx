import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-800 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-gray-400">
            <Link 
              to="/contact" 
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/domains" 
              className="hover:text-cyan-400 transition-colors"
            >
              Domains
            </Link>
            <Link 
              to="/directory" 
              className="hover:text-cyan-400 transition-colors"
            >
              Directory
            </Link>
            <Link 
              to="/lore" 
              className="hover:text-cyan-400 transition-colors"
            >
              Lore
            </Link>
            <Link 
              to="/wiki/fudscience" 
              className="hover:text-cyan-400 transition-colors"
            >
              FUD Science
            </Link>
            <Link 
              to="/retail-tickets" 
              className="hover:text-cyan-400 transition-colors"
            >
              Retail Tickets
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-cyan-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            © 2025 Retailstar. All rights reserved.
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-400">Social</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://x.com/retailstarsol" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">X (Twitter)</a></li>
            <li><a href="https://x.com/retailrunner" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Retailrunner Bot</a></li>
            <li><a href="https://instagram.com/retailstar.sol" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Instagram</a></li>
            {/* <li><a href="#" target="_blank" rel="noopener noreferrer">YouTube (coming soon)</a></li> */}
            {/* <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn (coming soon)</a></li> */}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



