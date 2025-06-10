import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertOrderSchema } from "@shared/schema";
import { z } from "zod";
import { GARMENT_TYPES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Package, CreditCard, CheckCircle } from "lucide-react";
import type { Design, Order } from "@shared/schema";

const orderFormSchema = insertOrderSchema.extend({
  garmentType: z.enum(GARMENT_TYPES),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

export default function CustomOrder() {
  const [location] = useLocation();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDesignId, setSelectedDesignId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Parse URL params for pre-selected design
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const preSelectedDesignId = urlParams.get('design');

  const { data: designs } = useQuery<Design[]>({
    queryKey: ["/api/designs"],
  });

  const { data: selectedDesign } = useQuery<Design>({
    queryKey: ["/api/designs", selectedDesignId],
    enabled: !!selectedDesignId,
  });

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      designId: preSelectedDesignId ? parseInt(preSelectedDesignId) : undefined,
      garmentType: "Kurta",
      totalAmount: 0,
      advanceAmount: 0,
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: OrderFormValues) => {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
      return response.json();
    },
    onSuccess: (order: Order) => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Order Created Successfully!",
        description: `Your order ID is ${order.orderId}. We'll send you courier instructions shortly.`,
      });
      setCurrentStep(6);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const steps = [
    { number: 1, title: "Choose Design", icon: Package },
    { number: 2, title: "Garment Details", icon: Package },
    { number: 3, title: "Personal Information", icon: Package },
    { number: 4, title: "Payment", icon: CreditCard },
    { number: 5, title: "Review", icon: Package },
    { number: 6, title: "Confirmation", icon: CheckCircle },
  ];

  const onSubmit = (data: OrderFormValues) => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate pricing based on selected design
      const design = designs?.find(d => d.id === data.designId);
      const estimatedPrice = design ? design.priceMin : 3000;
      const advanceAmount = Math.round(estimatedPrice * 0.5);

      createOrderMutation.mutate({
        ...data,
        totalAmount: estimatedPrice,
        advanceAmount,
      });
    }
  };

  const formatPrice = (price: number) => `₹${price?.toLocaleString() || '0'}`;

  const progress = (currentStep / 6) * 100;

  return (
    <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setLocation("/designs")}
            variant="ghost"
            className="mb-4 text-warm-gray hover:text-kashmiri-red"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Designs
          </Button>
          <h1 className="font-playfair text-4xl font-bold text-kashmiri-red mb-4">
            Custom Order
          </h1>
          <p className="text-warm-gray text-lg">
            Let's create something beautiful together
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`flex flex-col items-center ${
                    step.number <= currentStep ? "text-kashmiri-red" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step.number <= currentStep
                        ? "bg-kashmiri-red text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-center">{step.title}</span>
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Choose Design */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-kashmiri-red">Choose a Design</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="designId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Design</FormLabel>
                        <Select
                          value={field.value?.toString() || ""}
                          onValueChange={(value) => {
                            field.onChange(parseInt(value));
                            setSelectedDesignId(parseInt(value));
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a design..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {designs?.map((design) => (
                              <SelectItem key={design.id} value={design.id.toString()}>
                                {design.name} - {formatPrice(design.priceMin)} - {formatPrice(design.priceMax)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedDesign && (
                    <div className="bg-rose-gold/10 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={selectedDesign.imageUrl}
                          alt={selectedDesign.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-kashmiri-red">{selectedDesign.name}</h3>
                          <p className="text-sm text-warm-gray">{selectedDesign.description}</p>
                          <p className="text-saffron font-semibold">
                            {formatPrice(selectedDesign.priceMin)} - {formatPrice(selectedDesign.priceMax)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="customDesignUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Or Upload Custom Design (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Paste image URL of your custom design"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 2: Garment Details */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-kashmiri-red">Garment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="garmentType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Garment Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                          >
                            {GARMENT_TYPES.map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <RadioGroupItem value={type} id={type} />
                                <Label htmlFor={type}>{type}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="garmentImageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Photo of Your Garment (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Paste image URL of your garment"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sizeNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size or Placement Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific size requirements or placement instructions..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Comments</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any other special instructions or requests..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 3: Personal Information */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-kashmiri-red">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="customerName"
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
                      name="customerPhone"
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
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complete Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your complete address for garment return..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-kashmiri-red">Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-rose-gold/10 rounded-lg p-6">
                    <h3 className="font-semibold text-kashmiri-red mb-4">Order Summary</h3>
                    {selectedDesign && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Design:</span>
                          <span>{selectedDesign.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Price:</span>
                          <span className="text-saffron font-semibold">
                            {formatPrice(selectedDesign.priceMin)} - {formatPrice(selectedDesign.priceMax)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">Advance Payment (50%):</span>
                          <span className="font-semibold text-kashmiri-red">
                            {formatPrice(Math.round(selectedDesign.priceMin * 0.5))}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-warm-gray">
                    <p>• Advance payment secures your order</p>
                    <p>• Final amount will be calculated based on actual work</p>
                    <p>• Balance payment before return shipment</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-kashmiri-red">Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-kashmiri-red mb-3">Design Details</h3>
                      {selectedDesign && (
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Design:</span> {selectedDesign.name}</p>
                          <p><span className="font-medium">Price Range:</span> {formatPrice(selectedDesign.priceMin)} - {formatPrice(selectedDesign.priceMax)}</p>
                          <p><span className="font-medium">Estimated Time:</span> {selectedDesign.estimatedDays} days</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-kashmiri-red mb-3">Contact Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {form.watch("customerName")}</p>
                        <p><span className="font-medium">Email:</span> {form.watch("customerEmail")}</p>
                        <p><span className="font-medium">Phone:</span> {form.watch("customerPhone")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 6: Confirmation */}
            {currentStep === 6 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair text-kashmiri-red text-center">
                    Order Confirmed! 🎉
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <div>
                    <p className="text-lg text-warm-gray mb-4">
                      Thank you for your order! We'll send you detailed courier instructions via email and WhatsApp.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={() => setLocation("/how-to-send")}
                        className="kashmiri-gradient text-white"
                      >
                        View Courier Instructions
                      </Button>
                      <Button
                        onClick={() => setLocation("/track")}
                        variant="outline"
                        className="border-kashmiri-red text-kashmiri-red"
                      >
                        Track Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            {currentStep < 6 && (
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="border-kashmiri-red text-kashmiri-red"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className="kashmiri-gradient text-white"
                >
                  {currentStep === 5 ? "Place Order" : "Next"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
