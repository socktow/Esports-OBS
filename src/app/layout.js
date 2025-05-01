import { Bebas_Neue, Orbitron } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata = {
  title: 'Esports Tournament',
  description: 'Esports Tournament Overlay System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${orbitron.variable}`}>{children}</body>
    </html>
  );
}
