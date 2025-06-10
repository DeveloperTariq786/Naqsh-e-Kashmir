import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Send
} from "lucide-react";
import { WHATSAPP_NUMBER, COMPANY_EMAIL, COMPANY_ADDRESS } from "@/lib/constants";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // In a real application, this would send the data to your backend
    console.log("Contact form submitted:", data);
    setIsSubmitted(true);
    form.reset();
    
    // Auto-reset the success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: WHATSAPP_NUMBER,
      link: `tel:${WHATSAPP_NUMBER}`,
      description: "Call us during business hours"
    },
    {
      icon: Mail,
      title: "Email",
      details: COMPANY_EMAIL,
      link: `mailto:${COMPANY_EMAIL}`,
      description: "Send us an email anytime"
    },
    {
      icon: MapPin,
      title: "Address",
      details: COMPANY_ADDRESS,
      description: "Visit our workshop"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Sat: 9:00 AM - 6:00 PM",
      description: "Sunday: Closed"
    }
  ];

  return (
    <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-6">
            Get in Touch
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-8"></div>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Have questions about our embroidery services? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="border-kashmiri-red/20 mb-8">
              <CardHeader>
                <CardTitle className="font-playfair text-kashmiri-red">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-saffron to-kashmiri-red rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-kashmiri-red">{info.title}</h3>
                          <p className="text-sm text-warm-gray">{info.description}</p>
                        </div>
                      </div>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-warm-gray hover:text-kashmiri-red transition-colors ml-13 block"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-warm-gray ml-13">{info.details}</p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* WhatsApp Quick Contact */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-playfair text-lg font-semibold text-green-700 mb-2">
                    Quick Response via WhatsApp
                  </h3>
                  <p className="text-green-600 text-sm mb-4">
                    Get instant answers to your questions
                  </p>
                  <Button asChild className="bg-green-500 hover:bg-green-600 text-white w-full">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I have a question about Kashmir Tella Works embroidery services.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-kashmiri-red/20">
              <CardHeader>
                <CardTitle className="font-playfair text-kashmiri-red">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-green-700 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-green-600 mb-4">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-kashmiri-red text-kashmiri-red hover:bg-kashmiri-red hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="How can we help you?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={6}
                                placeholder="Tell us about your embroidery requirements, questions, or how we can assist you..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full kashmiri-gradient text-white py-3 hover:shadow-lg transition-all duration-300"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="font-playfair text-3xl font-bold text-kashmiri-red text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-kashmiri-red mb-3">How long does embroidery work take?</h3>
                <p className="text-warm-gray text-sm">
                  Typically 7-14 days depending on the complexity of the design. Simple neckline work 
                  takes 5-7 days, while full shawl embroidery can take 10-15 days.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-kashmiri-red mb-3">Do you work on all types of fabric?</h3>
                <p className="text-warm-gray text-sm">
                  We work on most natural fabrics like cotton, silk, linen, and wool. We'll assess 
                  your fabric and advise on the best approach for your specific material.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-kashmiri-red mb-3">Can I visit your workshop?</h3>
                <p className="text-warm-gray text-sm">
                  Yes! We welcome visitors to see our artisans at work. Please contact us in advance 
                  to schedule your visit to our Srinagar workshop.
                </p>
              </CardContent>
            </Card>

            <Card className="border-rose-gold/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-kashmiri-red mb-3">What if I'm not satisfied with the work?</h3>
                <p className="text-warm-gray text-sm">
                  Customer satisfaction is our priority. We offer revisions and will work with you 
                  to ensure you're completely happy with the final result.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}