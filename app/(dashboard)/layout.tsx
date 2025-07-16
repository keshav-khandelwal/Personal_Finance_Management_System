import { Header } from "@/components/header";
import Image from 'next/image';
type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14 flex-grow"> {/* Added flex-grow to push footer to bottom */}
        {children}
      </main>

      {/* --- Footer Section --- */}
      <footer className="bg-blue-800 text-white py-8 px-3 lg:px-14 mt-auto"> {/* mt-auto pushes footer to bottom */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-6 md:space-y-0">

          {/* Developer Info */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src="/photo.jpg" // Path to your photo
                alt="Keshav Khandelwal"
                width={50}
                height={50}
                className="rounded-full border-2 border-blue-400 shadow-lg object-cover"
              />
              <span className="text-lg font-semibold text-gray-100">
                Created by Keshav Khandelwal
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-5">
            <a
              href="mailto:keshavkhandelwal.jwr@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Email"
              className="transform hover:scale-110 transition-transform duration-200 ease-in-out group"
            >
              <Image
                src="/gmail.png"
                alt="Email"
                width={30}
                  height={30}
                  className="rounded-full shadow-lg border-2 border-white object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </a>
            <a
              href="https://github.com/keshav-khandelwal"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="transform hover:scale-110 transition-transform duration-200 ease-in-out group"
            >
              <Image
                src="/github.png"
                alt="GitHub"
                width={30}
                  height={30}
                  className="rounded-full shadow-lg border-2 border-white object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/keshav-khandelwal-kk/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="transform hover:scale-110 transition-transform duration-200 ease-in-out group"
            >
              <Image
                src="/linkedin.jpg"
                alt="LinkedIn"
                width={30}
                  height={30}
                  className="rounded-full shadow-lg border-2 border-white object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};


export default DashboardLayout;
