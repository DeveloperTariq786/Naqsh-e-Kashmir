import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Palette, PlayCircle } from "lucide-react";

export default function HeroBanner() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative h-screen bg-gradient-to-br from-kashmiri-red/10 to-saffron/10 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(185, 28, 44, 0.3), rgba(230, 145, 76, 0.3)), url('https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&h=1375')`
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="mb-6">
            <div className="inline-block bg-rose-gold/20 backdrop-blur-sm border border-rose-gold/30 rounded-full px-4 py-2 text-sm font-medium text-cream mb-4">
              ✨ Authentic Kashmiri Craftsmanship
            </div>
          </div>
          
          <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-tight mb-6">
            Bring your fabric to{" "}
            <span className="text-rose-gold">life</span> with authentic{" "}
            <span className="text-saffron">Kashmiri Tella</span> work
          </h1>
          
          <p className="text-xl text-cream/90 mb-8 leading-relaxed">
            Transform your cherished garments with exquisite hand-embroidered designs passed down through generations of Kashmiri artisans.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={() => setLocation("/designs")}
              className="bg-saffron hover:bg-saffron/90 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Palette className="mr-2 h-5 w-5" />
              Explore Designs
            </Button>
            <Button 
              onClick={() => {
                document.querySelector('[data-section="how-it-works"]')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              variant="outline"
              className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-white px-8 py-4 text-lg transition-all duration-300"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream to-transparent"></div>
      <div className="absolute top-20 right-20 w-20 h-20 bg-rose-gold/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 right-10 w-16 h-16 bg-saffron/20 rounded-full blur-lg"></div>
    </section>
  );
}
