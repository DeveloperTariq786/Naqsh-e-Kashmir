import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Design } from "@shared/schema";

export default function FeaturedDesigns() {
  const [, setLocation] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data: designs, isLoading } = useQuery<Design[]>({
    queryKey: ["/api/designs/featured"],
  });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const formatPrice = (min: number, max: number) => {
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-cream to-rose-gold/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
              Featured Designs
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          </div>
          <div className="flex space-x-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-cream to-rose-gold/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
            Featured Designs
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Our most loved and requested embroidery designs, each carefully crafted by master artisans.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-x-auto" ref={scrollRef}>
            <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
              {designs?.map((design) => (
                <div
                  key={design.id}
                  className="w-80 bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex-shrink-0"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={design.imageUrl}
                      alt={design.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-saffron text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                    <div className="absolute top-4 right-4 text-white cursor-pointer hover:scale-110 transition-transform">
                      <Heart className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-semibold text-kashmiri-red mb-2">
                      {design.name}
                    </h3>
                    <p className="text-warm-gray text-sm mb-4">{design.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-saffron font-semibold text-lg">
                        {formatPrice(design.priceMin, design.priceMax)}
                      </span>
                      <span className="text-sm text-warm-gray bg-gray-100 px-2 py-1 rounded">
                        {design.estimatedDays} days
                      </span>
                    </div>
                    <Button
                      onClick={() => setLocation(`/design/${design.id}`)}
                      className="w-full kashmiri-gradient text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      View Design
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              onClick={scrollLeft}
              variant="outline"
              size="icon"
              className="w-12 h-12 bg-white shadow-lg rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={scrollRight}
              variant="outline"
              size="icon"
              className="w-12 h-12 bg-white shadow-lg rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
