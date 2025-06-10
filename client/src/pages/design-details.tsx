import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Clock, 
  Package, 
  ArrowLeft,
  Star,
  Check
} from "lucide-react";
import type { Design } from "@shared/schema";

export default function DesignDetails() {
  const [, params] = useRoute("/design/:id");
  const [, setLocation] = useLocation();
  const designId = params?.id ? parseInt(params.id) : null;

  const { data: design, isLoading } = useQuery<Design>({
    queryKey: ["/api/designs", designId],
    queryFn: async () => {
      if (!designId) throw new Error("No design ID");
      const response = await fetch(`/api/designs/${designId}`);
      if (!response.ok) {
        throw new Error('Design not found');
      }
      return response.json();
    },
    enabled: !!designId
  });

  const formatPrice = (min: number, max: number) => {
    return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-kashmiri-red mb-4">Design not found</h1>
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
          Back to Designs
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={design.imageUrl}
                alt={design.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-white/30 transition-colors">
                <Heart className="h-5 w-5 text-white" />
              </div>
            </div>
            
            {/* Additional Images */}
            {design.additionalImages && design.additionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {design.additionalImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`${design.name} ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Design Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {design.isFeatured && (
                  <Badge className="bg-saffron text-white">Featured</Badge>
                )}
                {design.isPopular && (
                  <Badge className="bg-deep-teal text-white">Popular</Badge>
                )}
              </div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-kashmiri-red mb-4">
                {design.name}
              </h1>
              <p className="text-warm-gray text-lg leading-relaxed">
                {design.description}
              </p>
            </div>

            {/* Pricing & Duration */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-rose-gold/20">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center text-warm-gray mb-2">
                    <Package className="h-4 w-4 mr-2" />
                    <span className="text-sm">Price Range</span>
                  </div>
                  <div className="text-2xl font-bold text-saffron">
                    {formatPrice(design.priceMin, design.priceMax)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-warm-gray mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">Estimated Time</span>
                  </div>
                  <div className="text-2xl font-bold text-kashmiri-red">
                    {design.estimatedDays} days
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              {design.placement && (
                <div>
                  <span className="font-semibold text-kashmiri-red">Placement: </span>
                  <span className="text-warm-gray">{design.placement}</span>
                </div>
              )}
              {design.fabricTypes && design.fabricTypes.length > 0 && (
                <div>
                  <span className="font-semibold text-kashmiri-red">Suitable Fabrics: </span>
                  <span className="text-warm-gray">{design.fabricTypes.join(", ")}</span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setLocation(`/order?design=${design.id}`)}
              size="lg"
              className="w-full kashmiri-gradient text-white text-lg py-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Apply This Design to My Cloth
            </Button>

            {/* Additional Info Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="care">Care Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-rose-gold/20">
                  <h3 className="font-semibold text-kashmiri-red mb-3">What's Included:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-warm-gray">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Hand-embroidered design by master artisans
                    </li>
                    <li className="flex items-center text-warm-gray">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Premium quality threads and materials
                    </li>
                    <li className="flex items-center text-warm-gray">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Quality assurance and finishing
                    </li>
                    <li className="flex items-center text-warm-gray">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Secure packaging for return shipment
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="care" className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-rose-gold/20">
                  <h3 className="font-semibold text-kashmiri-red mb-3">Care Instructions:</h3>
                  <ul className="space-y-2 text-warm-gray">
                    <li>• Dry clean only to preserve embroidery</li>
                    <li>• Store in a cool, dry place</li>
                    <li>• Avoid direct sunlight for extended periods</li>
                    <li>• Handle with care to prevent thread damage</li>
                    <li>• Iron on reverse side with low heat</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
