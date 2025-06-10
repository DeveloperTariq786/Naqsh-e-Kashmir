import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useLocation } from "wouter";
import type { Design } from "@shared/schema";

interface DesignCardProps {
  design: Design;
}

export default function DesignCard({ design }: DesignCardProps) {
  const [, setLocation] = useLocation();

  const formatPrice = (min: number, max: number) => {
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={design.imageUrl}
          alt={design.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600";
          }}
        />
        {design.isPopular && (
          <div className="absolute top-4 left-4 bg-deep-teal text-white px-3 py-1 rounded-full text-sm font-medium">
            Popular
          </div>
        )}
        {design.isFeatured && (
          <div className="absolute top-4 left-4 bg-saffron text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 text-white cursor-pointer hover:scale-110 transition-transform">
          <Heart className="h-5 w-5" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-playfair text-xl font-semibold text-kashmiri-red mb-2">
          {design.name}
        </h3>
        <p className="text-warm-gray text-sm mb-4 line-clamp-3">{design.description}</p>
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
  );
}
