import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Filter, Grid, List } from "lucide-react";

const motifs = [
  {
    id: 1,
    name: "Traditional Paisley",
    category: "Classic",
    description: "Iconic teardrop-shaped motifs with intricate details",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    complexity: "Medium",
    applications: ["Neckline", "Border", "All-over"]
  },
  {
    id: 2,
    name: "Chinar Leaf",
    category: "Nature",
    description: "Kashmir's iconic maple leaf in various sizes",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    complexity: "Simple",
    applications: ["Border", "Corner", "Scattered"]
  },
  {
    id: 3,
    name: "Rose Garden",
    category: "Floral",
    description: "Delicate roses with stems and leaves",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    complexity: "Complex",
    applications: ["All-over", "Panel", "Dupatta"]
  },
  {
    id: 4,
    name: "Geometric Diamond",
    category: "Contemporary",
    description: "Modern diamond patterns with clean lines",
    image: "https://images.unsplash.com/photo-1583391733981-6c1c6a8b93ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    complexity: "Simple",
    applications: ["Border", "Repeat Pattern", "Neckline"]
  },
  {
    id: 5,
    name: "Vine Scroll",
    category: "Traditional",
    description: "Flowing vine patterns with small flowers",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    complexity: "Medium",
    applications: ["Border", "Sleeve", "Hem"]
  },
  {
    id: 6,
    name: "Lotus Blossom",
    category: "Floral",
    description: "Sacred lotus flowers in full bloom",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    complexity: "Complex",
    applications: ["Center Panel", "Medallion", "Corner"]
  },
  {
    id: 7,
    name: "Buti Dots",
    category: "Classic",
    description: "Small decorative dots and mini paisleys",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    complexity: "Simple",
    applications: ["Fill Pattern", "Background", "Scattered"]
  },
  {
    id: 8,
    name: "Persian Arch",
    category: "Architectural",
    description: "Ornate arches with detailed borders",
    image: "https://images.unsplash.com/photo-1583391733981-6c1c6a8b93ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    complexity: "Complex",
    applications: ["Panel", "Yoke", "Central Design"]
  },
  {
    id: 9,
    name: "Almond Cluster",
    category: "Nature",
    description: "Groups of almonds with decorative leaves",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    complexity: "Medium",
    applications: ["Repeat Pattern", "Border", "Corner"]
  }
];

const categories = ["All", "Classic", "Floral", "Nature", "Contemporary", "Traditional", "Architectural"];
const complexities = ["All", "Simple", "Medium", "Complex"];

export default function Motifs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedComplexity, setSelectedComplexity] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredMotifs = motifs.filter(motif => {
    const categoryMatch = selectedCategory === "All" || motif.category === selectedCategory;
    const complexityMatch = selectedComplexity === "All" || motif.complexity === selectedComplexity;
    return categoryMatch && complexityMatch;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Simple": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Complex": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-rose-gold/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-playfair font-bold text-kashmiri-red">Embroidery Motifs</h1>
              <p className="text-warm-gray">Choose from our collection of traditional and contemporary patterns</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "kashmiri-gradient text-white" : ""}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "kashmiri-gradient text-white" : ""}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="w-5 h-5 text-kashmiri-red" />
              <h3 className="font-semibold text-kashmiri-red">Filter Motifs</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "kashmiri-gradient text-white" : ""}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-warm-gray mb-2">Complexity</label>
                <div className="flex flex-wrap gap-2">
                  {complexities.map((complexity) => (
                    <Button
                      key={complexity}
                      variant={selectedComplexity === complexity ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedComplexity(complexity)}
                      className={selectedComplexity === complexity ? "kashmiri-gradient text-white" : ""}
                    >
                      {complexity}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-warm-gray">
            Showing {filteredMotifs.length} of {motifs.length} motifs
          </p>
        </div>

        {/* Motifs Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMotifs.map((motif) => (
              <Card key={motif.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={motif.image}
                    alt={motif.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <Badge className="bg-kashmiri-red text-white">
                      {motif.category}
                    </Badge>
                    <Badge className={getComplexityColor(motif.complexity)}>
                      {motif.complexity}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-kashmiri-red mb-2">
                    {motif.name}
                  </h3>
                  <p className="text-warm-gray mb-4">
                    {motif.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-warm-gray mb-2">Best for:</h4>
                    <div className="flex flex-wrap gap-1">
                      {motif.applications.map((app) => (
                        <Badge key={app} variant="outline" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full kashmiri-gradient text-white">
                    <Link href={`/motifs/${motif.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMotifs.map((motif) => (
              <Card key={motif.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <img
                      src={motif.image}
                      alt={motif.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-playfair text-xl font-semibold text-kashmiri-red">
                          {motif.name}
                        </h3>
                        <Badge className="bg-kashmiri-red text-white">
                          {motif.category}
                        </Badge>
                        <Badge className={getComplexityColor(motif.complexity)}>
                          {motif.complexity}
                        </Badge>
                      </div>
                      <p className="text-warm-gray mb-3">
                        {motif.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {motif.applications.map((app) => (
                          <Badge key={app} variant="outline" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button asChild className="kashmiri-gradient text-white">
                      <Link href={`/motifs/${motif.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredMotifs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-warm-gray mb-2">No motifs found</h3>
            <p className="text-warm-gray">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
}