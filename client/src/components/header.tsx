import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Design Gallery", href: "/designs" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Shipping Guide", href: "/how-to-send" },
  { name: "Order Tracking", href: "/track" },
];

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" onClick={closeMenu}>
            <div className="w-10 h-10 bg-gradient-to-br from-saffron to-kashmiri-red rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
            </div>
            <div>
              <h1 className="font-playfair text-xl font-bold text-kashmiri-red">Kashmir Tella Works</h1>
              <p className="text-xs text-warm-gray">Authentic Embroidery</p>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-warm-gray hover:text-kashmiri-red transition-colors font-medium ${
                    location === item.href ? "text-kashmiri-red" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Profile Icon and Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Link 
              href="/profile"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Profile"
            >
              <User className="h-6 w-6 text-warm-gray hover:text-kashmiri-red transition-colors" />
            </Link>
            
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-warm-gray" />
              ) : (
                <Menu className="h-6 w-6 text-warm-gray" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Navigation */}
        {isMenuOpen && (
          <div className="border-t border-rose-gold/20 bg-white/95 backdrop-blur-sm">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span 
                    className={`block px-4 py-3 text-sm font-medium transition-colors hover:text-kashmiri-red hover:bg-rose-gold/10 rounded-lg ${
                      location === item.href 
                        ? "text-kashmiri-red bg-rose-gold/10" 
                        : "text-warm-gray"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              

            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
