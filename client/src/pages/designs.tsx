import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import DesignFilters from "@/components/design-filters";
import DesignCard from "@/components/design-card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Design } from "@shared/schema";

export default function Designs() {
  const [location] = useLocation();
  const [filters, setFilters] = useState<{
    categoryId?: number;
    priceMin?: number;
    priceMax?: number;
    sortBy?: string;
  }>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Parse URL params on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const category = urlParams.get('category');
    
    if (category) {
      // In a real app, you'd fetch category by slug to get ID
      // For now, we'll just clear filters and let user select
    }
  }, [location]);

  const queryParams = new URLSearchParams();
  if (filters.categoryId) queryParams.append('categoryId', filters.categoryId.toString());
  if (filters.priceMin) queryParams.append('priceMin', filters.priceMin.toString());
  if (filters.priceMax) queryParams.append('priceMax', filters.priceMax.toString());
  if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

  const { data: designs, isLoading } = useQuery<Design[]>({
    queryKey: ["/api/designs", queryParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/designs?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch designs');
      }
      return response.json();
    }
  });

  return (
    <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
            Design Gallery
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Explore our extensive collection of traditional Kashmiri embroidery designs, each one carefully crafted by master artisans.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <DesignFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="mb-6">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="mt-6">
                  <DesignFilters filters={filters} onFiltersChange={setFilters} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Designs Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
            ) : designs && designs.length > 0 ? (
              <>
                <div className="mb-6 text-warm-gray">
                  Showing {designs.length} design{designs.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {designs.map((design) => (
                    <DesignCard key={design.id} design={design} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-kashmiri-red mb-2">
                  No designs found
                </h3>
                <p className="text-warm-gray mb-4">
                  Try adjusting your filters to see more designs.
                </p>
                <Button
                  onClick={() => setFilters({})}
                  variant="outline"
                  className="border-kashmiri-red text-kashmiri-red hover:bg-kashmiri-red hover:text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
