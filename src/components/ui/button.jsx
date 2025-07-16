import React from 'react';

export const Button = ({ 
  children, 
  className = '', 
  disabled = false, 
  type = 'button',
  onClick,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}; 