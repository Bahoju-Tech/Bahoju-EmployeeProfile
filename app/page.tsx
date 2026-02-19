import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Plus, ExternalLink } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'Home - Employee Profile Portal',
//   description: 'Welcome to the Employee Profile Portal',
// };

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 lg:py-4">
      <div className='flex items-center justify-center h-screen'>
        <div className="max-w-lg mx-auto bg-white lg:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 p-4">
        <div className="flex items-center justify-center mb-5 mt-8">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Employee Profile Portal
          </h1>
          <p className="text-gray-600 text-lg">
           View Bahojutech Employee Profile
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by{' '}
            <a 
              href="https://bahojutech.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#2158D0] hover:text-[#1a47a8] font-medium inline-flex items-center gap-1"
            >
              Bahoju Tech
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
