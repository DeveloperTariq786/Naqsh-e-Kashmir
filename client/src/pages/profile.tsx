import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Phone, Mail, Calendar, Package, Heart } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    address: "Rajouri Garden, New Delhi, India"
  });

  // Sample order history
  const orderHistory = [
    {
      id: "KTW-2024-001",
      designName: "Golden Paisley Neckline",
      status: "Delivered",
      date: "2024-01-15",
      amount: 3500,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      id: "KTW-2024-002", 
      designName: "Rose Garden Border",
      status: "In Progress",
      date: "2024-01-28",
      amount: 2800,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      id: "KTW-2024-003",
      designName: "Chinaar Leaf Shawl", 
      status: "Delivered",
      date: "2024-02-10",
      amount: 12000,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    }
  ];

  // Sample wishlist
  const wishlist = [
    {
      id: 4,
      name: "Floral Sleeve Design",
      price: "₹2,200 - ₹3,800",
      image: "https://images.unsplash.com/photo-1583391733981-6c1c6a8b93ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      id: 5,
      name: "Traditional Collar Work",
      price: "₹1,800 - ₹2,900", 
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-rose-gold/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-kashmiri-red mb-2">My Profile</h1>
          <p className="text-warm-gray">Manage your account and track your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-saffron to-kashmiri-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="font-playfair text-kashmiri-red">{userInfo.name}</CardTitle>
                <CardDescription>Kashmir Tella Works Customer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-warm-gray" />
                  <span className="text-sm">{userInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-warm-gray" />
                  <span className="text-sm">{userInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-warm-gray" />
                  <span className="text-sm">{userInfo.address}</span>
                </div>
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full mt-6 bg-kashmiri-red hover:bg-kashmiri-red/90"
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Order History Tab */}
              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="w-5 h-5" />
                      <span>Order History</span>
                    </CardTitle>
                    <CardDescription>Track your previous and current orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderHistory.map((order) => (
                        <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <img 
                            src={order.image} 
                            alt={order.designName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-kashmiri-red">{order.designName}</h4>
                            <p className="text-sm text-warm-gray">Order ID: {order.id}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-warm-gray flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {order.date}
                              </span>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-kashmiri-red">₹{order.amount.toLocaleString()}</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5" />
                      <span>My Wishlist</span>
                    </CardTitle>
                    <CardDescription>Designs you want to order later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-32 rounded-lg object-cover mb-3"
                          />
                          <h4 className="font-semibold text-kashmiri-red">{item.name}</h4>
                          <p className="text-sm text-warm-gray mb-3">{item.price}</p>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1 bg-kashmiri-red hover:bg-kashmiri-red/90">
                              Order Now
                            </Button>
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}