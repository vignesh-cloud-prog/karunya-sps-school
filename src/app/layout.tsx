import './globals.css';
import  Navbar  from './components/Navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Karunya Special School',
  description: 'Empowering specially aided children with quality education and care in Malpe, Karnataka.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-poppins antialiased bg-white text-gray-600">
        <Navbar />
        {children}
      </body>
    </html>
  );
} 