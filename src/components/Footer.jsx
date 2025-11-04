import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} SolarInfo · Contact: your-email@example.com
      </div>
    </footer>
  );
}