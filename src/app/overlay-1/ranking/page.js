'use client';

import { useState, useEffect } from 'react';

export default function RankingPage() {
  const totalMatches = 6; // Define total matches once

  const [teams, setTeams] = useState([
    { id: 1, name: 'Team MG', wins: 6 },
    { id: 2, name: 'Team PSI', wins: 6 },
    { id: 3, name: 'Team PRO', wins: 5 },
    { id: 4, name: 'Team DN', wins: 4 },
    { id: 5, name: 'Team HÀI', wins: 2 },
    { id: 6, name: 'Team HPS', wins: 1 },
    { id: 7, name: 'Team GFF', wins: 0 },
    { id: 8, name: 'Team KFC', wins: 0 },
  ]);

  const sortedTeams = [...teams].sort((a, b) => b.wins - a.wins);

  return (
    <>
      <style jsx global>{`
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
          }
          100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
          }
        }

        @keyframes topTeamGlow {
          0% {
            box-shadow: 0 0 10px rgba(234, 179, 8, 0.5);
          }
          50% {
            box-shadow: 0 0 25px rgba(234, 179, 8, 0.8);
          }
          100% {
            box-shadow: 0 0 10px rgba(234, 179, 8, 0.5);
          }
        }

        @keyframes secondTeamGlow {
          0% {
            box-shadow: 0 0 10px rgba(156, 163, 175, 0.5);
          }
          50% {
            box-shadow: 0 0 25px rgba(156, 163, 175, 0.8);
          }
          100% {
            box-shadow: 0 0 10px rgba(156, 163, 175, 0.5);
          }
        }

        @keyframes thirdTeamGlow {
          0% {
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
          }
          50% {
            box-shadow: 0 0 25px rgba(239, 68, 68, 0.8);
          }
          100% {
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
          }
        }

        @keyframes fourthTeamGlow {
          0% {
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 25px rgba(139, 92, 246, 0.8);
          }
          100% {
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          }
        }

        .team-row {
          animation: slideInFromLeft 0.5s ease-out forwards;
          opacity: 0;
        }

        .rank-badge {
          animation: glowPulse 2s infinite;
        }

        .rank-badge-1 {
          animation: topTeamGlow 2s infinite;
        }

        .rank-badge-2 {
          animation: secondTeamGlow 2s infinite;
        }

        .rank-badge-3 {
          animation: thirdTeamGlow 2s infinite;
        }

        .rank-badge-4 {
          animation: fourthTeamGlow 2s infinite;
        }

        .win-count, .lose-count {
          transition: all 0.3s ease;
        }

        .win-count:hover, .lose-count:hover {
          transform: scale(1.1);
        }

        .top-team {
          background: linear-gradient(45deg, rgba(234, 179, 8, 0.1), rgba(234, 179, 8, 0.2));
        }

        .second-team {
          background: linear-gradient(45deg, rgba(156, 163, 175, 0.1), rgba(156, 163, 175, 0.2));
        }

        .third-team {
          background: linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.2));
        }

        .fourth-team {
          background: linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.2));
        }
      `}</style>

      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-5"
        >
          <source src="/image/ahri.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-8">
          <h1 className="text-7xl font-black text-white mb-16 animate-fade-in tracking-wider text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600">
              TEAM RANKINGS
            </span>
          </h1>
          
          <div className="w-full max-w-5xl backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-blue-500/20">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50">
                  <th className="py-8 px-10 text-gray-300 font-bold text-sm uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Rank
                    </div>
                  </th>
                  <th className="py-8 px-10 text-gray-300 font-bold text-sm uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Team
                    </div>
                  </th>
                  <th className="py-8 px-10 text-gray-300 font-bold text-sm uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Wins
                    </div>
                  </th>
                  <th className="py-8 px-10 text-gray-300 font-bold text-sm uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Losses
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-500/10">
                {sortedTeams.map((team, index) => (
                  <tr 
                    key={team.id}
                    className={`
                      team-row transition-all duration-500 hover:bg-blue-900/20
                      ${index === 0 ? 'top-team' : ''}
                      ${index === 1 ? 'second-team' : ''}
                      ${index === 2 ? 'third-team' : ''}
                      ${index === 3 ? 'fourth-team' : ''}
                    `}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <td className="py-6 px-10 text-center">
                      <span className={`
                        inline-flex items-center justify-center w-12 h-12 rounded-xl
                        ${index === 0 ? 'rank-badge-1 bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' : ''}
                        ${index === 1 ? 'rank-badge-2 bg-gradient-to-br from-gray-300 to-gray-400 text-black' : ''}
                        ${index === 2 ? 'rank-badge-3 bg-gradient-to-br from-red-400 to-red-600 text-white' : ''}
                        ${index === 3 ? 'rank-badge-4 bg-gradient-to-br from-purple-400 to-purple-600 text-white' : ''}
                        ${index > 3 ? 'rank-badge bg-gradient-to-br from-blue-500 to-blue-600 text-white' : ''}
                        font-bold text-xl shadow-lg transform hover:scale-110 transition-transform duration-300
                      `}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-6 px-10 text-center">
                      <span className={`
                        text-xl tracking-wide transition-colors duration-300
                        ${index === 0 ? 'text-yellow-400 hover:text-yellow-300' : ''}
                        ${index === 1 ? 'text-gray-300 hover:text-gray-200' : ''}
                        ${index === 2 ? 'text-red-400 hover:text-red-300' : ''}
                        ${index === 3 ? 'text-purple-400 hover:text-purple-300' : ''}
                        ${index > 3 ? 'text-gray-200 hover:text-blue-400' : ''}
                        font-medium
                      `}>
                        {team.name}
                      </span>
                    </td>
                    <td className="py-6 px-10 text-center">
                      <span className={`
                        win-count inline-block px-6 py-2 rounded-full font-bold text-xl
                        ${index === 0 ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : ''}
                        ${index === 1 ? 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30' : ''}
                        ${index === 2 ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : ''}
                        ${index === 3 ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' : ''}
                        ${index > 3 ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : ''}
                        transition-colors duration-300
                      `}>
                        {team.wins}
                      </span>
                    </td>
                    <td className="py-6 px-10 text-center">
                      <span className={`
                        lose-count inline-block px-6 py-2 rounded-full font-bold text-xl
                        ${index === 0 ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : ''}
                        ${index === 1 ? 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30' : ''}
                        ${index === 2 ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : ''}
                        ${index === 3 ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30' : ''}
                        ${index > 3 ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : ''}
                        transition-colors duration-300
                      `}>
                        {totalMatches - team.wins}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
