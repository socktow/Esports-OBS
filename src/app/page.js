import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Esports Tournament Overlays</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overlay 1 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Overlay 1</h2>
          <div className="space-y-4">
            <Link href="/overlay-1/landing" className="block p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
              Landing Page
            </Link>
            <Link href="/overlay-1/caster" className="block p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
              Caster Page
            </Link>
            <Link href="/overlay-1/game" className="block p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
              Game Page
            </Link>
            <Link href="/overlay-1/replay" className="block p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
              Replay Page
            </Link>
          </div>
        </div>

        {/* Overlay 2 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Overlay 2</h2>
          <div className="space-y-4">
            <Link href="/overlay-2/landing" className="block p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
              Landing Page
            </Link>
            <Link href="/overlay-2/caster" className="block p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
              Caster Page
            </Link>
            <Link href="/overlay-2/game" className="block p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
              Game Page
            </Link>
            <Link href="/overlay-2/replay" className="block p-4 bg-gray-700 rounded hover:bg-gray-600 transition">
              Replay Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
