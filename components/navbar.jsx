"use client"; // required for client-side hooks like usePathname
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="border-b border-dashed border-gray-300 bg-white">
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
        .font-merriweather {
          font-family: 'Merriweather', serif;
        }
      `}</style>
      <div className="px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <span className="font-merriweather text-2xl font-bold">
              R Balajee & Co
            </span>
          </div>

          {/* Right side - Links */}
          <div className="flex space-x-20 px-8 font-mono font-semibold">
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
        </div>
      </div>
    </nav>
  );
}
