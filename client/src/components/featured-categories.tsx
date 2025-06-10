import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import type { Category } from "@shared/schema";

export default function FeaturedCategories() {
  const [, setLocation] = useLocation();
  
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleCategoryClick = (categorySlug: string) => {
    setLocation(`/designs?category=${categorySlug}`);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
              Explore by Category
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
            Explore by Category
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Discover our exquisite collection of traditional Kashmiri embroidery designs, each category telling its own story.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={category.imageUrl || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-playfair text-2xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.designCount}+ Designs</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
