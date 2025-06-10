import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { WHATSAPP_NUMBER, COMPANY_EMAIL, COMPANY_ADDRESS } from "@/lib/constants";

export default function Footer() {
  const [location] = useLocation();
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Thank you for subscribing! You will receive updates about our latest designs.");
      (e.target as HTMLFormElement).reset();
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-kashmiri-red text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-saffron to-rose-gold rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold">Kashmir Tella Works</h3>
                <p className="text-xs text-rose-gold">Authentic Embroidery</p>
              </div>
            </div>
            <p className="text-rose-gold/80 mb-6">
              Preserving the ancient art of Kashmiri embroidery while bringing it to modern wardrobes. 
              Each stitch tells a story of heritage and craftsmanship.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-rose-gold hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-rose-gold hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-rose-gold hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/designs" className="text-rose-gold/80 hover:text-white transition-colors">Design Gallery</Link></li>
              <li><Link href="/order" className="text-rose-gold/80 hover:text-white transition-colors">Place Order</Link></li>
              <li><Link href="/how-to-send" className="text-rose-gold/80 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/track" className="text-rose-gold/80 hover:text-white transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-6">Customer Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-rose-gold/80 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-rose-gold/80 hover:text-white transition-colors">Shipping Guide</a></li>
              <li><a href="#" className="text-rose-gold/80 hover:text-white transition-colors">Care Instructions</a></li>
              <li><a href="#" className="text-rose-gold/80 hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-rose-gold/80 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-rose-gold/80 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-saffron" />
                <span className="text-rose-gold/80">{COMPANY_ADDRESS}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-saffron" />
                <span className="text-rose-gold/80">{WHATSAPP_NUMBER}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-saffron" />
                <span className="text-rose-gold/80">{COMPANY_EMAIL}</span>
              </div>
              <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>WhatsApp Us</span>
                </a>
              </Button>
            </div>
          </div>
        </div>



        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-rose-gold/60 text-sm">
            © 2024 Kashmir Tella Works. All rights reserved. |{" "}
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> |{" "}
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
