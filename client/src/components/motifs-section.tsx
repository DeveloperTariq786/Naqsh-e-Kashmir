import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Motif } from "@shared/schema";

export default function MotifsSection() {
  const { data: motifs, isLoading } = useQuery<Motif[]>({
    queryKey: ["/api/motifs"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-cream via-white to-rose-gold/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-kashmiri-red mb-4">
              Browse Embroidery Motifs
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto mb-2">
              Loading motifs...
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {motifs?.map((motif) => (
            <Link
              key={motif.id}
              href={`/motifs/${motif.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={motif.imageUrl ?? undefined}
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