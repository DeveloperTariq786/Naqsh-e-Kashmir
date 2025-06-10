import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Palette, Truck, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const [, setLocation] = useLocation();

  const steps = [
    {
      icon: Palette,
      title: "Choose a Design",
      description: "Browse our extensive collection of traditional Kashmiri embroidery patterns or upload your custom design. Each pattern comes with detailed information about placement and pricing."
    },
    {
      icon: Truck,
      title: "Courier Your Garment",
      description: "Safely pack and send your fabric or garment to our atelier using our detailed instructions. We provide packaging guidelines and tracking support throughout the journey."
    },
    {
      icon: Sparkles,
      title: "We Apply & Send Back",
      description: "Our master artisans carefully hand-embroider your chosen design with precision and care. Once complete, we securely package and return your transformed garment."
    }
  ];

  return (
    <section className="py-20 bg-white" data-section="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Simple, secure, and seamless. Get your garments embroidered with authentic Kashmiri designs in just three easy steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-saffron to-kashmiri-red rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-deep-teal text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-kashmiri-red mb-4">
                  {step.title}
                </h3>
                <p className="text-warm-gray leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="kashmiri-gradient-subtle rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-playfair text-2xl font-semibold text-kashmiri-red mb-4">
              Ready to get started?
            </h3>
            <p className="text-warm-gray mb-6">
              Transform your favorite garment with authentic Kashmiri embroidery today.
            </p>
            <Button
              onClick={() => setLocation("/order")}
              className="kashmiri-gradient text-white px-8 py-3 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Your Order
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
