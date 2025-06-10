import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { 
  Package, 
  MapPin, 
  Truck, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Phone,
  Mail
} from "lucide-react";
import { WHATSAPP_NUMBER, COMPANY_EMAIL, COMPANY_ADDRESS } from "@/lib/constants";

export default function CourierInstructions() {
  const [, setLocation] = useLocation();

  const packingSteps = [
    {
      step: 1,
      title: "Clean Your Garment",
      description: "Ensure your garment is clean and dry before packing. This helps our artisans work with the best possible fabric condition.",
      icon: Shield,
      tips: ["Dry clean if necessary", "Check for any stains", "Ensure fabric is completely dry"]
    },
    {
      step: 2,
      title: "Use Proper Packaging",
      description: "Wrap your garment in tissue paper or cotton cloth to prevent wrinkles and protect during transit.",
      icon: Package,
      tips: ["Use acid-free tissue paper", "Avoid plastic bags", "Include a muslin cloth if available"]
    },
    {
      step: 3,
      title: "Secure Packaging",
      description: "Place in a sturdy box with adequate padding. Include your order details and contact information inside.",
      icon: Shield,
      tips: ["Use a hard cardboard box", "Add bubble wrap for protection", "Include order confirmation printout"]
    },
    {
      step: 4,
      title: "Label Clearly",
      description: "Write the shipping address clearly and attach your courier tracking slip securely.",
      icon: MapPin,
      tips: ["Use waterproof ink", "Double-check address", "Keep tracking number safe"]
    }
  ];

  const courierPartners = [
    {
      name: "Blue Dart",
      recommended: true,
      tracking: "Available",
      delivery: "1-2 days"
    },
    {
      name: "FedEx",
      recommended: true,
      tracking: "Available", 
      delivery: "1-2 days"
    },
    {
      name: "DTDC",
      recommended: false,
      tracking: "Available",
      delivery: "2-3 days"
    },
    {
      name: "India Post Speed Post",
      recommended: false,
      tracking: "Available",
      delivery: "3-5 days"
    }
  ];

  return (
    <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
            How to Send Your Garment
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Follow these simple steps to safely send your garment to our atelier. We'll take care of the rest!
          </p>
        </div>

        {/* Shipping Address */}
        <Card className="mb-8 border-kashmiri-red/20">
          <CardHeader className="bg-gradient-to-r from-kashmiri-red to-saffron text-white rounded-t-lg">
            <CardTitle className="font-playfair text-center">Ship Your Garment To</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <h3 className="font-playfair text-xl font-semibold text-kashmiri-red">Kashmir Tella Works</h3>
              <div className="text-warm-gray space-y-2">
                <p className="flex items-center justify-center">
                  <MapPin className="h-4 w-4 mr-2 text-saffron" />
                  Atelier Address, Workshop Complex
                </p>
                <p>Srinagar, Kashmir - 190001</p>
                <p>India</p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center text-sm text-warm-gray">
                  <Phone className="h-4 w-4 mr-1 text-saffron" />
                  {WHATSAPP_NUMBER}
                </div>
                <div className="flex items-center text-sm text-warm-gray">
                  <Mail className="h-4 w-4 mr-1 text-saffron" />
                  {COMPANY_EMAIL}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packing Instructions */}
        <div className="mb-8">
          <h2 className="font-playfair text-3xl font-bold text-kashmiri-red mb-6 text-center">
            Packing Instructions
          </h2>
          <div className="grid gap-6">
            {packingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.step} className="border-rose-gold/20 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-saffron to-kashmiri-red rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Icon className="h-5 w-5 text-kashmiri-red mr-2" />
                          <h3 className="font-playfair text-xl font-semibold text-kashmiri-red">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-warm-gray mb-3">{step.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {step.tips.map((tip, index) => (
                            <div key={index} className="flex items-center text-sm text-warm-gray">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                              {tip}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recommended Courier Partners */}
        <div className="mb-8">
          <h2 className="font-playfair text-3xl font-bold text-kashmiri-red mb-6 text-center">
            Recommended Courier Partners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courierPartners.map((courier, index) => (
              <Card key={index} className={`border-rose-gold/20 ${courier.recommended ? 'ring-2 ring-saffron/20' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-kashmiri-red text-lg">{courier.name}</h3>
                    {courier.recommended && (
                      <Badge className="bg-saffron text-white">Recommended</Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-warm-gray">Tracking:</span>
                      <span className="text-kashmiri-red font-medium">{courier.tracking}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm-gray">Delivery Time:</span>
                      <span className="text-kashmiri-red font-medium">{courier.delivery}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="font-playfair text-kashmiri-red flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-warm-gray">
              <div className="space-y-2">
                <p className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                  Send your garment within 7 days of placing the order
                </p>
                <p className="flex items-start">
                  <Shield className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                  We recommend insuring valuable garments during transit
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-start">
                  <Package className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                  Keep your courier tracking number safe for reference
                </p>
                <p className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                  Contact us immediately if there are any shipping delays
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-playfair text-kashmiri-red text-center">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-kashmiri-red mb-2">What if I don't send my garment on time?</h4>
                <p className="text-warm-gray text-sm">
                  If you need more time, please contact us within 7 days. We can extend the deadline by up to 2 weeks. 
                  After that, your order may be cancelled and advance payment refunded.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-kashmiri-red mb-2">Can I send multiple garments in one package?</h4>
                <p className="text-warm-gray text-sm">
                  Yes, if you have multiple orders, you can send them together. Please include separate order details 
                  for each garment and mention this in your shipping note.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-kashmiri-red mb-2">What if my package gets lost in transit?</h4>
                <p className="text-warm-gray text-sm">
                  This is why we recommend using reliable courier services with tracking. If insured, you can claim 
                  compensation. We'll also help you trace the package using the tracking number.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-kashmiri-red mb-2">How will I know when you receive my garment?</h4>
                <p className="text-warm-gray text-sm">
                  We'll update your order status to "Cloth Received" and send you a confirmation via email and WhatsApp 
                  within 24 hours of receiving your package.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => setLocation("/order")}
              className="kashmiri-gradient text-white px-8 py-3"
            >
              Place New Order
            </Button>
            <Button
              onClick={() => setLocation("/track")}
              variant="outline"
              className="border-kashmiri-red text-kashmiri-red hover:bg-kashmiri-red hover:text-white px-8 py-3"
            >
              Track Existing Order
            </Button>
          </div>
          <div className="mt-6">
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I need help with shipping my garment for embroidery work.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Need Help? WhatsApp Us</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
