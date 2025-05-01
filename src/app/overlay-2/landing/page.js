import Image from 'next/image';

export default function Overlay2Landing() {
  return (
    <div className="w-full h-full relative">
      {/* Background Image with Effects */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/post_lol_03a.webp"
          alt="Esports Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full animate-pulse">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/10 to-transparent animate-pulse" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-pink-500/10 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Main Content Area - Adjusted position */}
        <div className="flex-1 flex items-center justify-center pt-[80px]">
          <div className="text-center">
            <h1 className="text-8xl font-bold mb-4 text-white drop-shadow-lg animate-fade-in">
              ESPORTS TOURNAMENT
            </h1>
            <p className="text-4xl text-gray-300 font-light animate-fade-in-delay">
              Season 2024
            </p>
          </div>
        </div>

        {/* Footer with Sponsors */}
        <div className="h-[100px] flex items-center justify-center gap-8 bg-transparent">
          <div className="text-white text-xl font-light">POWERED BY</div>
          <div className="flex gap-6">
            {/* Add sponsor logos here */}
            <div className="w-32 h-12 bg-white/10 rounded hover:bg-white/20 transition-all duration-300"></div>
            <div className="w-32 h-12 bg-white/10 rounded hover:bg-white/20 transition-all duration-300"></div>
            <div className="w-32 h-12 bg-white/10 rounded hover:bg-white/20 transition-all duration-300"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
} 