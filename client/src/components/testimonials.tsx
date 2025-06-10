import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-rose-gold/20 to-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="h-32 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-rose-gold/20 to-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Hear from women who have experienced the magic of authentic Kashmiri embroidery on their cherished garments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-rose-gold/20"
            >
              <div className="flex items-center mb-6">
                <div className="flex text-saffron mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-warm-gray italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.imageUrl || "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-kashmiri-red">{testimonial.name}</h4>
                  <p className="text-sm text-warm-gray">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-kashmiri-red mb-2">500+</div>
              <p className="text-warm-gray text-sm">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-kashmiri-red mb-2">200+</div>
              <p className="text-warm-gray text-sm">Unique Designs</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-kashmiri-red mb-2">15+</div>
              <p className="text-warm-gray text-sm">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-kashmiri-red mb-2">4.9</div>
              <p className="text-warm-gray text-sm">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
