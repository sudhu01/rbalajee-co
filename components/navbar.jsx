"use client"; // required for client-side hooks like usePathname
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
    <nav className="border-b border-dashed border-gray-300 bg-white">
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
        .font-merriweather {
          font-family: 'Merriweather', serif;
        }

        body.sidebar-open {
          overflow: hidden;
        }
      `}</style>
      <div className="px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <span className="font-merriweather text-lg md:text-2xl sm:text-xl font-bold">
              R Balajee & Co
            </span>
          </div>

          {/* Right side - Links */}
          <div className="hidden md:flex lg:space-x-20 px-8 font-mono font-semibold">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href ? "text-slate-900" : "text-slate-500"
                } hover:text-slate-900`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-slate-900" />
            </button>
        </div>
      </div>
    </nav>

    {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-dashed border-gray-300 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-dashed border-gray-300">
          <span className="font-merriweather text-lg font-bold text-slate-900">
            Menu
          </span>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-slate-900" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-6 space-y-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeSidebar}
              className={`${
                pathname === link.href
                  ? "text-slate-900 font-bold border-l-4 border-purple-950 pl-4"
                  : "text-slate-500 pl-4"
              } font-mono text-lg hover:text-slate-900 hover:border-l-4 hover:border-purple-950 transition-all`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-dashed border-gray-300">
          <p className="text-xs text-slate-500 text-center font-mono">
            © {new Date().getFullYear()} R Balajee & Co
          </p>
        </div>
      </div>
    </>
  );
}
