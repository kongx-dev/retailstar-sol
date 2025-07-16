import React from 'react';

export const Input = ({ 
  className = '', 
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  ...props 
}) => {
  const baseClasses = "block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200";
  
  return (
    <input
      type={type}
      className={`${baseClasses} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      {...props}
    />
  );
}; 