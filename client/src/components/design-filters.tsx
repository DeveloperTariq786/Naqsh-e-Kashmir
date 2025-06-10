import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { SORT_OPTIONS } from "@/lib/constants";
import type { Category } from "@shared/schema";

interface DesignFiltersProps {
  filters: {
    categoryId?: number;
    priceMin?: number;
    priceMax?: number;
    sortBy?: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function DesignFilters({ filters, onFiltersChange }: DesignFiltersProps) {
  const [priceRange, setPriceRange] = useState([filters.priceMin || 1000, filters.priceMax || 10000]);
  
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, categoryId });
    } else {
      const { categoryId: _, ...rest } = filters;
      onFiltersChange(rest);
    }
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({
      ...filters,
      priceMin: values[0],
      priceMax: values[1]
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    setPriceRange([1000, 10000]);
    onFiltersChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-playfair text-lg font-semibold text-kashmiri-red">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-warm-gray hover:text-kashmiri-red"
        >
          Clear All
        </Button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-warm-gray mb-2">Sort By</label>
        <Select value={filters.sortBy || ""} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-warm-gray mb-3">Categories</label>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categoryId === category.id}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm text-warm-gray cursor-pointer flex-1"
              >
                {category.name} ({category.designCount})
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-warm-gray mb-3">
          Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
        </label>
        <Slider
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          min={1000}
          max={10000}
          step={500}
          className="w-full"
        />
      </div>
    </div>
  );
}
