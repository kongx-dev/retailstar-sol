import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Breadcrumbs component for navigation
 * @param {Object} props
 * @param {Array<{label: string, href: string}>} props.items - Array of breadcrumb items
 */
const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="text-cyan-300 font-semibold">{item.label}</span>
            ) : (
              <>
                <Link
                  to={item.href}
                  className="text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  {item.label}
                </Link>
                <span className="text-gray-500">/</span>
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;


