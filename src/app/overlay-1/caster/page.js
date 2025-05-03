"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Overlay1Caster() {
  const [showStinger, setShowStinger] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowStinger(false), 1200); // 1.2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Stinger Effect Overlay */}
      {showStinger && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-black via-gray-900 to-black animate-stinger" />
        </div>
      )}

      {/* Background Image + Gradient trắng-đen từ dưới lên */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/vayne.jpg"
          alt="Caster Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient phủ tối + trắng-đen từ dưới lên 50% */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-gray-900 to-white/0 pointer-events-none" />
      </div>

      {/* Main Content: 2 Frame mới */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        <div className="flex gap-14 justify-center items-center pb-[20%]">
          {/* Frame 1 */}
          <div className="flex flex-col items-center">
            {/* Frame body */}
            <div className="w-96 h-[32rem] rounded-xl bg-green-500 border-4 border-blue-400/80 shadow-2xl flex flex-col items-center justify-center relative">
              {/* Tag name dưới frame, 50% trong, 50% ngoài */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex flex-nowrap text-lg font-bold font-orbitron shadow-lg">
                <div className="bg-white text-gray-900 px-4 py-2 rounded-l-lg border-y-2 border-l-2 border-gray-300 uppercase whitespace-nowrap">caster</div>
                <div className="bg-blue-600 text-white px-6 py-2 rounded-r-lg border-y-2 border-r-2 border-blue-400 uppercase whitespace-nowrap">41 Dev1ce</div>
              </div>
            </div>
          </div>

          {/* Frame 2 */}
          <div className="flex flex-col items-center">
            {/* Frame body */}
            <div className="w-96 h-[32rem] rounded-xl bg-green-500 border-4 border-red-400/80 shadow-2xl flex flex-col items-center justify-center relative">
              {/* Tag name dưới frame, 50% trong, 50% ngoài */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex flex-nowrap text-lg font-bold font-orbitron shadow-lg">
                <div className="bg-white text-gray-900 px-4 py-2 rounded-l-lg border-y-2 border-l-2 border-red-300 uppercase whitespace-nowrap">caster</div>
                <div className="bg-pink-600 text-white px-6 py-2 rounded-r-lg border-y-2 border-r-2 border-red-400 uppercase whitespace-nowrap">KEN</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes stinger {
          0% { transform: translateX(0); }
          80% { transform: translateX(0); }
          100% { transform: translateX(100vw); }
        }
        .animate-stinger {
          animation: stinger 1.2s cubic-bezier(0.7,0,0.3,1) forwards;
        }
        .font-orbitron {
          font-family: var(--font-orbitron);
        }
        .animated-border-blue {
          border-image: linear-gradient(135deg, #3b82f6, #06b6d4, #818cf8, #3b82f6) 1;
          animation: border-anim-blue 2s linear infinite;
        }
        .animated-border-pink {
          border-image: linear-gradient(135deg, #ec4899, #f472b6, #f9a8d4, #ec4899) 1;
          animation: border-anim-pink 2s linear infinite;
        }
        @keyframes border-anim-blue {
          0% { border-image-source: linear-gradient(135deg, #3b82f6, #06b6d4, #818cf8, #3b82f6); }
          50% { border-image-source: linear-gradient(315deg, #818cf8, #06b6d4, #3b82f6, #818cf8); }
          100% { border-image-source: linear-gradient(135deg, #3b82f6, #06b6d4, #818cf8, #3b82f6); }
        }
        @keyframes border-anim-pink {
          0% { border-image-source: linear-gradient(135deg, #ec4899, #f472b6, #f9a8d4, #ec4899); }
          50% { border-image-source: linear-gradient(315deg, #f9a8d4, #f472b6, #ec4899, #f9a8d4); }
          100% { border-image-source: linear-gradient(135deg, #ec4899, #f472b6, #f9a8d4, #ec4899); }
        }
      `}</style>
    </div>
  );
}
