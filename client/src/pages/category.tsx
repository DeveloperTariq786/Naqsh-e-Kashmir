import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import DesignCard from "@/components/design-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import type { Design, Category } from "@shared/schema";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:slug");
  const [, setLocation] = useLocation();
  const categorySlug = params?.slug;

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: designs, isLoading } = useQuery<Design[]>({
    queryKey: ["/api/designs", categorySlug],
    queryFn: async () => {
      const category = categories?.find(cat => cat.slug === categorySlug);
      if (!category) throw new Error("Category not found");
      
      const response = await fetch(`/api/designs?categoryId=${category.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch designs');
      }
      return response.json();
    },
    enabled: !!categories && !!categorySlug
  });

  const category = categories?.find(cat => cat.slug === categorySlug);

  if (isLoading) {
    return (
      <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="h-8 bg-gray-200 rounded mb-8 animate-pulse max-w-md"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
      </div>
    );
  }

  if (!category) {
    return (
      <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-kashmiri-red mb-4">Category not found</h1>
          <Button onClick={() => setLocation("/designs")}>
            Back to Designs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          onClick={() => setLocation("/designs")}
          variant="ghost"
          className="mb-6 text-warm-gray hover:text-kashmiri-red"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Designs
        </Button>

        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
            {category.name}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          {category.description && (
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <div className="mt-4 text-sm text-warm-gray">
            {designs?.length || 0} design{(designs?.length || 0) !== 1 ? 's' : ''} available
          </div>
        </div>

        {/* Designs Grid */}
        {designs && designs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs.map((design) => (
              <DesignCard key={design.id} design={design} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-gray-400 text-2xl">🎨</div>
            </div>
            <h3 className="font-playfair text-xl font-semibold text-kashmiri-red mb-2">
              No designs available
            </h3>
            <p className="text-warm-gray mb-4">
              We're working on adding more designs to this category. Check back soon!
            </p>
            <Button
              onClick={() => setLocation("/designs")}
              variant="outline"
              className="border-kashmiri-red text-kashmiri-red hover:bg-kashmiri-red hover:text-white"
            >
              Browse All Designs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}