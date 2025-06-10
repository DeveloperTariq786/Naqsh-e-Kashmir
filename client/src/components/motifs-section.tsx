import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const motifs = [
  {
    id: 1,
    name: "Floral",
    description: "Traditional Kashmiri flowers",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Traditional"
  },
  {
    id: 2,
    name: "Chinar Leaf",
    description: "Iconic maple leaf patterns",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Nature"
  },
  {
    id: 3,
    name: "Paisley Buti",
    description: "Classic paisley motifs",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Classic"
  },
  {
    id: 4,
    name: "Geometric",
    description: "Modern geometric patterns",
    image: "https://images.unsplash.com/photo-1583391733981-6c1c6a8b93ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Contemporary"
  },
  {
    id: 5,
    name: "Rose Garden",
    description: "Delicate rose patterns",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Floral"
  },
  {
    id: 6,
    name: "Vine Border",
    description: "Elegant vine patterns",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Border"
  }
];

export default function MotifsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-cream via-white to-rose-gold/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold text-kashmiri-red mb-4">
            Browse Embroidery Motifs
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto mb-2">
            Prefer your own layout? Pick from our Tella motifs and decide where to apply them.
          </p>
          <p className="text-warm-gray">
            Create custom combinations with traditional Kashmiri patterns
          </p>
        </div>

        {/* Motifs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {motifs.map((motif) => (
            <Link
              key={motif.id}
              href={`/motifs/${motif.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={motif.image}
                    alt={motif.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-kashmiri-red">
                      {motif.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-playfair font-semibold text-kashmiri-red mb-1 group-hover:text-saffron transition-colors">
                    {motif.name}
                  </h3>
                  <p className="text-sm text-warm-gray">
                    {motif.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            asChild
            size="lg"
            className="kashmiri-gradient text-white hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-3"
          >
            <Link href="/motifs">
              <span className="flex items-center space-x-2">
                <span>See All Motifs</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}