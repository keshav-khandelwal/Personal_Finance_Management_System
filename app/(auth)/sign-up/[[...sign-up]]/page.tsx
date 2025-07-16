'use client';

import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { SignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800 opacity-90"></div>

      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zm1 6v-1L1 0h1z\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-w-6xl w-full min-h-[calc(100vh-2rem)] lg:h-[750px]">
        {/* Left Section - Branding */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-blue-600 to-indigo-700 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
          <div className="flex flex-col items-center justify-center flex-grow py-4 lg:py-0">
            <Image
              src="/logo.png"
              height={280}
              width={280}
              alt="Project Logo"
              priority
              className="drop-shadow-xl mb-4 animate-fade-in-up"
            />
            <h2 className="text-2xl md:text-3xl font-extrabold text-center drop-shadow-md leading-tight mt-4 px-2">
              Your Financial Journey, Simplified.
            </h2>
            <p className="text-sm md:text-base text-center mt-2 max-w-sm opacity-95 tracking-wide px-4">
              Seamlessly track, manage, and optimize your finances with our intuitive platform.
            </p>
          </div>

          {/* Developer Info */}
          <div className="flex flex-col items-center space-y-3 mt-8 lg:mt-0 pb-4">
            <div className="flex items-center space-x-3 p-2 bg-white bg-opacity-15 rounded-full shadow-lg backdrop-filter backdrop-blur-sm">
              <Image
                src="/photo.jpg"
                alt="Keshav Khandelwal"
                width={40}
                height={40}
                className="rounded-full shadow-lg border-2 border-white object-cover transform transition-transform duration-300 hover:scale-105"
              />
              <span className="text-sm md:text-md font-semibold text-white">Created by Keshav Khandelwal</span>
            </div>
            <div className="flex gap-4 mt-2">
              <a
                href="mailto:keshavkhandelwal.jwr@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Email"
                className="transform hover:scale-115 transition-transform duration-200 ease-in-out group"
              >
                <Image src="/gmail.png" alt="Email" width={30} height={30}
                className="rounded-full shadow-lg border-2 border-white object-cover transform transition-transform duration-300 hover:scale-105" />
              </a>
              <a
                href="https://github.com/keshav-khandelwal"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="transform hover:scale-115 transition-transform duration-200 ease-in-out group"
              >
                <Image src="/github.png" alt="GitHub" width={30} height={30}
                className="rounded-full shadow-lg border-2 border-white object-cover transform transition-transform duration-300 hover:scale-105" />
              </a>
              <a
                href="https://www.linkedin.com/in/keshav-khandelwal-kk/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="transform hover:scale-115 transition-transform duration-200 ease-in-out group"
              >
                <Image src="/linkedin.jpg" alt="LinkedIn" width={30} height={30}
                className="rounded-full shadow-lg border-2 border-white object-cover transform transition-transform duration-300 hover:scale-105" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Sign Up */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none relative z-20">
          <div className="text-center space-y-3 mb-6 lg:mb-8">
            <h1 className="font-bold text-2xl md:text-3xl text-gray-800 leading-tight">
              Create Your Account
            </h1>
            <p className="text-sm md:text-md text-gray-600 max-w-xs mx-auto">
              Sign up to manage and optimize your financial journey.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <ClerkLoaded>
              <SignUp path="/sign-up" />
            </ClerkLoaded>

            <ClerkLoading>
              <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
            </ClerkLoading>
          </div>
        </div>
      </div>
    </div>
  );
}
