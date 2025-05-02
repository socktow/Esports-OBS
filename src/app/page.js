"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleCopyUrl = (path) => {
    const fullUrl = `${baseUrl}${path}`;
    navigator.clipboard.writeText(fullUrl);
    alert('URL copied to clipboard!');
  };

  const handleOpenUrl = (path) => {
    window.open(`${baseUrl}${path}`, '_blank');
  };

  const routes = [
    {
      name: 'Landing Page',
      path: '/overlay-1/landing',
      description: 'Tournament introduction and main information',
      image: '/image/post_lol_03a.webp'
    },
    {
      name: 'Next Match',
      path: '/overlay-1/nextmatch',
      description: 'Upcoming match details and countdown',
      image: '/image/ahri.mp4'
    },
    {
      name: 'Caster',
      path: '/overlay-1/caster',
      description: 'Caster information and commentary',
      image: '/image/vayne.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Esports Tournament Overlay</h1>
          <p className="text-gray-400">Select an overlay to copy or open its URL</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <div key={route.path} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
              {/* Image Preview */}
              <div className="relative h-48">
                {route.image.endsWith('.mp4') ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                  >
                    <source src={route.image} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={route.image}
                    alt={route.name}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{route.name}</h2>
                <p className="text-gray-400 mb-4">{route.description}</p>
                
                {/* URL Display */}
                <div className="mb-4">
                  <div className="text-sm text-gray-400 font-mono bg-gray-900 p-2 rounded overflow-x-auto">
                    {baseUrl}{route.path}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCopyUrl(route.path)}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy URL
                  </button>
                  <button
                    onClick={() => handleOpenUrl(route.path)}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
