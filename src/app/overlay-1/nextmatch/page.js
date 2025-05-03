"use client"
import { useEffect, useState } from 'react';

export default function NextMatch() {
  const [settings, setSettings] = useState(null);
  const [timeLeft, setTimeLeft] = useState('00:00');
  const [mounted, setMounted] = useState(false);

  const calculateTimeLeft = (settings) => {
    if (!settings) return '00:00';

    const now = new Date();
    const timezone = settings.matchDay.countdown.timezone;
    
    const targetTime = new Date();
    targetTime.setHours(settings.matchDay.countdown.time.hour);
    targetTime.setMinutes(settings.matchDay.countdown.time.minute);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);

    const nowInTimezone = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const targetInTimezone = new Date(targetTime.toLocaleString('en-US', { timeZone: timezone }));

    if (nowInTimezone > targetInTimezone) {
      targetInTimezone.setDate(targetInTimezone.getDate() + 1);
    }

    const diff = targetInTimezone - nowInTimezone;

    if (diff <= 0) {
      return '00:00';
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadSettings = async () => {
      try {
        const response = await fetch('/setting.json');
        if (!response.ok) {
          throw new Error('Failed to load settings');
        }
        const data = await response.json();
        setSettings(data);
        // Calculate initial time left
        setTimeLeft(calculateTimeLeft(data));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();

    const timer = setInterval(() => {
      if (!settings) return;
      setTimeLeft(calculateTimeLeft(settings));
    }, 1000);

    return () => clearInterval(timer);
  }, [settings?.matchDay.countdown, mounted]);

  if (!mounted || !settings) {
    return null;
  }

  return (
    <div className="w-full h-full relative">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/image/ahri.mp4" type="video/mp4" />
        </video>
        
        {/* Simple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <div className="p-4 text-center border-b border-white/10">
          <h1 className="text-4xl font-bold text-white font-bebas tracking-wider">
            {settings.tournamentName}
          </h1>
          <p className="text-xl text-gray-300 mt-1 font-orbitron">
            {settings.matchDay.title}
          </p>
        </div>

        {/* Match Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl">
            {/* Countdown Section */}
            <div className="text-center mb-6">
              <h2 className="text-2xl text-white font-orbitron mb-2">
                NEXT MATCH STARTS IN
              </h2>
              <div className="text-6xl font-bold text-white font-bebas tracking-wider">
                {timeLeft}
              </div>
            </div>

            {/* Matches Section */}
            <div className="space-y-6">
              {settings.matchDay.matches.map((match) => (
                <div 
                  key={match.id}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                    match.isLive ? 'live-match' : 'bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm'
                  }`}
                >
                  <div className="p-6">
                    {/* Match Title and Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl text-white font-orbitron">{match.title}</span>
                        {match.isLive && (
                          <span className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-full animate-pulse">
                            LIVE
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-400 font-orbitron">BEST OF 1</span>
                    </div>

                    {/* Teams and Score */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
                      
                      <div className="relative flex items-center justify-between bg-black/40 rounded-xl p-6 backdrop-blur-sm">
                        {/* Team 1 */}
                        <div className="flex-1 text-center">
                          <div className="mb-2">
                            <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center">
                              <span className="text-2xl font-bold text-white font-bebas">
                                {match.team1.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-4xl font-bold text-white font-bebas tracking-wider">
                            {match.team1.name}
                          </h3>
                        </div>

                        {/* VS and Scores */}
                        <div className="mx-8 flex items-center space-x-6">
                          <div className="text-6xl font-bold text-blue-400 font-bebas">
                            {match.team1.score}
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-3xl font-bold text-white/80 font-bebas mb-2">
                              VS
                            </div>
                            <div className="text-sm text-gray-400 font-orbitron">
                              {match.isLive ? 'LIVE NOW' : 
                                (match.team1.score > 0 || match.team2.score > 0) ? 'ENDED' : 'UPCOMING'}
                            </div>
                          </div>
                          <div className="text-6xl font-bold text-red-400 font-bebas">
                            {match.team2.score}
                          </div>
                        </div>

                        {/* Team 2 */}
                        <div className="flex-1 text-center">
                          <div className="mb-2">
                            <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center">
                              <span className="text-2xl font-bold text-white font-bebas">
                                {match.team2.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-4xl font-bold text-white font-bebas tracking-wider">
                            {match.team2.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 text-center border-t border-white/10">
          <div className="text-lg text-gray-300 font-orbitron">
            Timezone: {settings.matchDay.countdown.timezone}
          </div>
          <div className="text-sm text-gray-400 mt-1 font-orbitron">
            Match Time: {settings.matchDay.countdown.time.hour.toString().padStart(2, '0')}:{settings.matchDay.countdown.time.minute.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .font-bebas {
          font-family: var(--font-bebas);
        }
        .font-orbitron {
          font-family: var(--font-orbitron);
        }
        .live-match {
          position: relative;
          background: linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(59, 130, 246, 0.1));
        }
        .live-match::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          border-radius: 0.75rem;
          background: linear-gradient(90deg, #ef4444, #3b82f6, #ef4444) border-box;
          -webkit-mask: 
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: border-animation 2s linear infinite;
        }
        @keyframes border-animation {
          0% {
            background-position: 0% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
