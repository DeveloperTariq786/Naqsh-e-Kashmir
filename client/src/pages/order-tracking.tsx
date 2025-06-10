import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { 
  Search, 
  Package, 
  CheckCircle, 
  Clock, 
  Truck, 
  MapPin,
  Phone,
  Mail,
  Calendar,
  AlertCircle
} from "lucide-react";
import { ORDER_STATUSES, WHATSAPP_NUMBER } from "@/lib/constants";
import type { Order } from "@shared/schema";

const trackingFormSchema = z.object({
  orderId: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
}).refine((data) => {
  return data.orderId || (data.email && data.phone);
}, {
  message: "Please provide either Order ID or both Email and Phone number",
  path: ["orderId"]
});

type TrackingFormValues = z.infer<typeof trackingFormSchema>;

export default function OrderTracking() {
  const [searchType, setSearchType] = useState<"orderId" | "contact">("orderId");
  const [searchParams, setSearchParams] = useState<{ orderId?: string; email?: string; phone?: string } | null>(null);

  const form = useForm<TrackingFormValues>({
    resolver: zodResolver(trackingFormSchema),
    defaultValues: {
      orderId: "",
      email: "",
      phone: "",
    },
  });

  // Query for single order by ID
  const { data: singleOrder, isLoading: isLoadingSingle, error: singleError } = useQuery<Order>({
    queryKey: ["/api/orders", searchParams?.orderId],
    queryFn: async () => {
      if (!searchParams?.orderId) throw new Error("No order ID");
      const response = await fetch(`/api/orders/${searchParams.orderId}`);
      if (!response.ok) {
        throw new Error('Order not found');
      }
      return response.json();
    },
    enabled: !!searchParams?.orderId
  });

  // Query for orders by email and phone
  const { data: multipleOrders, isLoading: isLoadingMultiple, error: multipleError } = useQuery<Order[]>({
    queryKey: ["/api/orders/track", searchParams?.email, searchParams?.phone],
    queryFn: async () => {
      if (!searchParams?.email || !searchParams?.phone) throw new Error("No email or phone");
      const response = await fetch(`/api/orders/track/${searchParams.email}/${searchParams.phone}`);
      if (!response.ok) {
        throw new Error('Orders not found');
      }
      return response.json();
    },
    enabled: !!(searchParams?.email && searchParams?.phone)
  });

  const onSubmit = (data: TrackingFormValues) => {
    if (searchType === "orderId" && data.orderId) {
      setSearchParams({ orderId: data.orderId });
    } else if (searchType === "contact" && data.email && data.phone) {
      setSearchParams({ email: data.email, phone: data.phone });
    }
  };

  const getStatusProgress = (status: string) => {
    const statusOrder = ["awaiting_cloth", "cloth_received", "work_in_progress", "shipped_back", "completed"];
    const currentIndex = statusOrder.indexOf(status);
    return currentIndex >= 0 ? ((currentIndex + 1) / statusOrder.length) * 100 : 0;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "awaiting_cloth":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "cloth_received":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "work_in_progress":
        return <Package className="h-5 w-5 text-saffron" />;
      case "shipped_back":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "awaiting_cloth":
        return "bg-amber-100 text-amber-800";
      case "cloth_received":
        return "bg-blue-100 text-blue-800";
      case "work_in_progress":
        return "bg-orange-100 text-orange-800";
      case "shipped_back":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="border-rose-gold/20 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-playfair text-kashmiri-red">
            Order #{order.orderId}
          </CardTitle>
          <Badge className={getStatusColor(order.status)}>
            {ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-warm-gray">
          <Calendar className="h-4 w-4 mr-2" />
          Placed on {formatDate(order.createdAt)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-kashmiri-red">Progress</span>
            <span className="text-sm text-warm-gray">{getStatusProgress(order.status)}% Complete</span>
          </div>
          <Progress value={getStatusProgress(order.status)} className="h-2" />
        </div>

        {/* Status Timeline */}
        <div className="space-y-3">
          <h4 className="font-semibold text-kashmiri-red">Order Status</h4>
          <div className="flex items-center space-x-3 p-3 bg-rose-gold/10 rounded-lg">
            {getStatusIcon(order.status)}
            <div>
              <p className="font-medium text-kashmiri-red">
                {ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]}
              </p>
              <p className="text-sm text-warm-gray">
                Last updated: {formatDate(order.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-kashmiri-red mb-2">Order Details</h5>
            <div className="space-y-1 text-warm-gray">
              <p><span className="font-medium">Garment:</span> {order.garmentType}</p>
              <p><span className="font-medium">Total Amount:</span> {formatPrice(order.totalAmount)}</p>
              <p><span className="font-medium">Advance Paid:</span> {formatPrice(order.advanceAmount)}</p>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-kashmiri-red mb-2">Contact Details</h5>
            <div className="space-y-1 text-warm-gray">
              <p className="flex items-center">
                <Mail className="h-3 w-3 mr-2" />
                {order.customerEmail}
              </p>
              <p className="flex items-center">
                <Phone className="h-3 w-3 mr-2" />
                {order.customerPhone}
              </p>
            </div>
          </div>
        </div>

        {/* Tracking Information */}
        {order.trackingId && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h5 className="font-semibold text-kashmiri-red mb-2">Shipping Information</h5>
            <div className="space-y-1 text-sm text-warm-gray">
              <p><span className="font-medium">Tracking ID:</span> {order.trackingId}</p>
              {order.courierPartner && (
                <p><span className="font-medium">Courier:</span> {order.courierPartner}</p>
              )}
              {order.estimatedDelivery && (
                <p><span className="font-medium">Estimated Delivery:</span> {formatDate(order.estimatedDelivery)}</p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            size="sm"
            variant="outline"
            className="border-kashmiri-red text-kashmiri-red hover:bg-kashmiri-red hover:text-white"
            asChild
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I need help with my order ${order.orderId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Support
            </a>
          </Button>
          {order.status === "awaiting_cloth" && (
            <Button
              size="sm"
              className="bg-saffron hover:bg-saffron/90 text-white"
              onClick={() => window.location.href = "/how-to-send"}
            >
              View Shipping Guide
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const isLoading = isLoadingSingle || isLoadingMultiple;
  const error = singleError || multipleError;
  const orders = singleOrder ? [singleOrder] : multipleOrders || [];

  return (
    <div className="py-8 bg-gradient-to-br from-cream to-rose-gold/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-kashmiri-red mb-4">
            Track Your Order
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-kashmiri-red mx-auto mb-6"></div>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Enter your order details below to track the progress of your embroidery work.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 border-kashmiri-red/20">
          <CardHeader>
            <CardTitle className="font-playfair text-kashmiri-red text-center">
              Find Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Type Toggle */}
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                <Button
                  type="button"
                  variant={searchType === "orderId" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setSearchType("orderId");
                    setSearchParams(null);
                    form.reset();
                  }}
                  className={searchType === "orderId" ? "kashmiri-gradient text-white" : ""}
                >
                  Order ID
                </Button>
                <Button
                  type="button"
                  variant={searchType === "contact" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setSearchType("contact");
                    setSearchParams(null);
                    form.reset();
                  }}
                  className={searchType === "contact" ? "kashmiri-gradient text-white" : ""}
                >
                  Email & Phone
                </Button>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {searchType === "orderId" ? (
                  <FormField
                    control={form.control}
                    name="orderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your order ID (e.g., KTW1234567890)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              {...field}
                            />
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
                            <Input
                              placeholder="+91 98765 43210"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full kashmiri-gradient text-white"
                  disabled={isLoading}
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isLoading ? "Searching..." : "Track Order"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-semibold text-red-700 mb-2">
                Order Not Found
              </h3>
              <p className="text-red-600 mb-4">
                We couldn't find any orders matching your search criteria. Please check your details and try again.
              </p>
              <div className="text-sm text-red-600 space-y-1">
                <p>• Make sure your Order ID is correct</p>
                <p>• Verify your email and phone number match our records</p>
                <p>• Contact us if you're still having trouble</p>
              </div>
              <Button asChild className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'm having trouble tracking my order.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Support
                </a>
              </Button>
            </CardContent>
          </Card>
        )}

        {orders.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-playfair text-2xl font-bold text-kashmiri-red text-center">
              {orders.length === 1 ? "Your Order" : `Your Orders (${orders.length})`}
            </h2>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Help Section */}
        {!searchParams && (
          <Card className="mt-12 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="font-playfair text-kashmiri-red text-center">
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-warm-gray">
                Can't find your order or need assistance? We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I need help tracking my order.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp Support
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="border-kashmiri-red text-kashmiri-red hover:bg-kashmiri-red hover:text-white"
                  onClick={() => window.location.href = "/how-to-send"}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Shipping Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Demo Orders Section */}
        {!orders.length && !isLoading && !error && (
          <div className="mt-12">
            <h3 className="text-xl font-playfair font-semibold text-kashmiri-red mb-6">Sample Orders for Demo</h3>
            <p className="text-warm-gray mb-4">Try tracking these sample orders:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <p className="font-semibold text-kashmiri-red">KTW-2024-001</p>
                <p className="text-sm text-warm-gray">priya.sharma@example.com</p>
                <p className="text-sm text-warm-gray">+91 98765 43210</p>
                <p className="text-xs text-green-600 mt-2">Status: Delivered</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <p className="font-semibold text-kashmiri-red">KTW-2024-002</p>
                <p className="text-sm text-warm-gray">anjali.singh@example.com</p>
                <p className="text-sm text-warm-gray">+91 87654 32109</p>
                <p className="text-xs text-blue-600 mt-2">Status: In Progress</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <p className="font-semibold text-kashmiri-red">KTW-2024-003</p>
                <p className="text-sm text-warm-gray">meera.gupta@example.com</p>
                <p className="text-sm text-warm-gray">+91 76543 21098</p>
                <p className="text-xs text-yellow-600 mt-2">Status: Ready for Delivery</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
