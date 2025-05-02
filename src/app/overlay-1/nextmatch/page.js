"use client"
import { useEffect, useState } from 'react';

export default function NextMatch() {
  const [settings, setSettings] = useState({
    tournamentName: "TOURNAMENT 2025 test",
    nextMatch: {
      team1: { name: "SKT", score: 1 },
      team2: { name: "GEN", score: 2 },
      countdown: {
        time: { hour: 21, minute: 35 },
        timezone: "Asia/Ho_Chi_Minh"
      }
    }
  });

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/setting.json');
        if (!response.ok) {
          throw new Error('Failed to load settings');
        }
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();

    const timer = setInterval(() => {
      const now = new Date();
      const targetTime = new Date();
      
      targetTime.setHours(settings.nextMatch.countdown.time.hour);
      targetTime.setMinutes(settings.nextMatch.countdown.time.minute);
      targetTime.setSeconds(0);
      
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
      
      const diff = targetTime - now;
      
      if (diff <= 0) {
        setTimeLeft('00:00');
        clearInterval(timer);
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.nextMatch.countdown.time.hour, settings.nextMatch.countdown.time.minute]);

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
        <div className="p-8 text-center border-b border-white/10">
          <h1 className="text-6xl font-bold text-white font-bebas tracking-wider">
            {settings.tournamentName}
          </h1>
          <p className="text-2xl text-gray-300 mt-2 font-orbitron">
            SEASON 2025
          </p>
        </div>

        {/* Match Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-6xl">
            {/* Countdown Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl text-white font-orbitron mb-4">
                NEXT MATCH STARTS IN
              </h2>
              <div className="text-9xl font-bold text-white font-bebas tracking-wider">
                {timeLeft}
              </div>
            </div>

            {/* Teams Section */}
            <div className="flex items-center justify-between">
              {/* Team 1 */}
              <div className="text-center w-1/3">
                <div className="text-8xl font-bold text-blue-400 mb-4 font-bebas">
                  {settings.nextMatch.team1.score}
                </div>
                <h3 className="text-5xl font-bold text-white font-bebas mb-2">
                  {settings.nextMatch.team1.name}
                </h3>
                <div className="text-xl text-gray-300 font-orbitron">
                  TEAM 1
                </div>
              </div>

              {/* VS and Bo3 */}
              <div className="text-center w-1/3">
                <div className="text-7xl font-bold text-white font-bebas mb-4">
                  VS
                </div>
                <div className="text-3xl text-gray-300 font-orbitron">
                  BEST OF 3
                </div>
              </div>

              {/* Team 2 */}
              <div className="text-center w-1/3">
                <div className="text-8xl font-bold text-red-400 mb-4 font-bebas">
                  {settings.nextMatch.team2.score}
                </div>
                <h3 className="text-5xl font-bold text-white font-bebas mb-2">
                  {settings.nextMatch.team2.name}
                </h3>
                <div className="text-xl text-gray-300 font-orbitron">
                  TEAM 2
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center border-t border-white/10">
          <div className="text-xl text-gray-300 font-orbitron">
            Timezone: {settings.nextMatch.countdown.timezone}
          </div>
          <div className="text-sm text-gray-400 mt-2 font-orbitron">
            Match Time: {settings.nextMatch.countdown.time.hour.toString().padStart(2, '0')}:{settings.nextMatch.countdown.time.minute.toString().padStart(2, '0')}
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
      `}</style>
    </div>
  );
}
