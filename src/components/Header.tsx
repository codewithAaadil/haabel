"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-[200] bg-black/80 backdrop-blur-md px-6 md:px-10 py-6 md:py-10 flex justify-between items-center text-white">
      <Link href="/" className="font-gtextbd text-lg md:text-xl tracking-wide z-50">
        HAABEL
      </Link>
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 items-center z-50">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            href={link.path}
            className={`text-xs tracking-wider hover:text-gray-300 transition-colors ${pathname === link.path ? 'font-gtexpbd text-white' : 'font-gtexprg text-gray-400'}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white hover:text-gray-300 transition-colors z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-3xl tracking-widest hover:text-gray-300 transition-colors ${pathname === link.path ? 'font-gtexpbd text-white' : 'font-gtexprg text-gray-400'}`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
