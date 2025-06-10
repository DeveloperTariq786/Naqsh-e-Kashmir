import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { 
  Heart, 
  Award, 
  Users, 
  MapPin,
  Clock,
  Star
} from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();

  const values = [
    {
      icon: Heart,
      title: "Passion for Craft",
      description: "Every stitch carries the love and dedication of generations of Kashmiri artisans who have perfected this ancient art."
    },
    {
      icon: Award,
      title: "Authentic Quality",
      description: "We use only traditional techniques and premium materials to ensure each piece meets the highest standards of craftsmanship."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Supporting local artisan families and preserving traditional employment in Kashmir's embroidery communities."
    }
  ];

  const milestones = [
    { year: "2008", event: "Founded by master artisan Rafiq Ahmad" },
    { year: "2012", event: "Expanded to serve customers across India" },
    { year: "2018", event: "Launched online platform for wider reach" },
    { year: "2020", event: "500+ satisfied customers milestone" },
    { year: "2024", event: "Recognized as leading Kashmiri embroidery service" }
  ];

  return (
    <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-6">
            Our Story
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-8"></div>
          <p className="text-warm-gray text-lg max-w-3xl mx-auto leading-relaxed">
            For over 15 years, Kashmir Tella Works has been dedicated to preserving and sharing the exquisite art of 
            Kashmiri embroidery. Our journey began with a simple mission: to keep alive the traditional craft that 
            has been the pride of Kashmir for centuries.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-kashmiri-red to-saffron text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="font-playfair text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto">
                To preserve the ancient art of Kashmiri Tella embroidery while making it accessible to modern wardrobes. 
                We bridge the gap between traditional craftsmanship and contemporary fashion, ensuring that every piece 
                tells a story of heritage, skill, and timeless beauty.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-kashmiri-red text-center mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-rose-gold/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-saffron to-kashmiri-red rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-kashmiri-red mb-4">
                      {value.title}
                    </h3>
                    <p className="text-warm-gray leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Artisan Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-kashmiri-red mb-6">
                Master Artisan Rafiq Ahmad
              </h2>
              <p className="text-warm-gray mb-6 leading-relaxed">
                Born into a family of traditional embroiderers in Srinagar, Rafiq Ahmad learned the art of Tella work 
                from his grandfather at the age of 12. With over 30 years of experience, he has mastered the intricate 
                techniques that make Kashmiri embroidery world-renowned.
              </p>
              <p className="text-warm-gray mb-6 leading-relaxed">
                His vision was to create a platform where this beautiful craft could reach appreciative hands across 
                the world, while ensuring fair compensation for the skilled artisans who create these masterpieces.
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-saffron text-white">30+ Years Experience</Badge>
                <Badge className="bg-deep-teal text-white">Master Craftsman</Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
                alt="Master Artisan at work"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Workshop Section */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-kashmiri-red text-center mb-12">
            Our Workshop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Traditional embroidery tools"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">Traditional Tools</h3>
                <p className="text-sm opacity-90">Authentic equipment used for centuries</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Skilled artisans at work"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">Skilled Artisans</h3>
                <p className="text-sm opacity-90">Master craftspeople at work</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1452827073306-6e6e661baf57?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Quality control process"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">Quality Control</h3>
                <p className="text-sm opacity-90">Every piece inspected with care</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-kashmiri-red text-center mb-12">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron to-kashmiri-red rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-rose-gold/20 flex-1">
                  <p className="text-warm-gray">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-gold/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-kashmiri-red mb-2">500+</div>
                <p className="text-warm-gray text-sm">Satisfied Customers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-kashmiri-red mb-2">15+</div>
                <p className="text-warm-gray text-sm">Years of Experience</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-kashmiri-red mb-2">25</div>
                <p className="text-warm-gray text-sm">Skilled Artisans</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-kashmiri-red mb-2">200+</div>
                <p className="text-warm-gray text-sm">Design Patterns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-16">
          <Card className="border-rose-gold/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-kashmiri-red mb-4">
                    Visit Our Workshop
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-warm-gray">
                      <MapPin className="h-5 w-5 mr-3 text-saffron" />
                      Srinagar, Kashmir, India
                    </div>
                    <div className="flex items-center text-warm-gray">
                      <Clock className="h-5 w-5 mr-3 text-saffron" />
                      Monday - Saturday: 9:00 AM - 6:00 PM
                    </div>
                  </div>
                  <p className="text-warm-gray mt-4 leading-relaxed">
                    We welcome visitors to see our artisans at work and learn about the traditional 
                    techniques that make Kashmiri embroidery so special. Please contact us in advance 
                    to schedule your visit.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Kashmir landscape"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="kashmiri-gradient-subtle rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="font-playfair text-2xl font-semibold text-kashmiri-red mb-4">
              Ready to Experience Traditional Craft?
            </h3>
            <p className="text-warm-gray mb-6">
              Let us transform your garment with authentic Kashmiri embroidery.
            </p>
            <Button
              onClick={() => setLocation("/designs")}
              className="kashmiri-gradient text-white px-8 py-3 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Designs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}