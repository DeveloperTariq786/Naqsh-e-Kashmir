import { 
  categories, designs, orders, testimonials, users,
  type Category, type Design, type Order, type Testimonial, type User,
  type InsertCategory, type InsertDesign, type InsertOrder, type InsertTestimonial, type InsertUser
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Designs
  getDesigns(filters?: {
    categoryId?: number;
    priceMin?: number;
    priceMax?: number;
    sortBy?: 'popular' | 'newest' | 'price_asc' | 'price_desc';
  }): Promise<Design[]>;
  getDesignById(id: number): Promise<Design | undefined>;
  getFeaturedDesigns(): Promise<Design[]>;
  getDesignsByCategory(categoryId: number): Promise<Design[]>;
  createDesign(design: InsertDesign): Promise<Design>;

  // Orders
  getOrder(orderId: string): Promise<Order | undefined>;
  getOrderByEmailAndPhone(email: string, phone: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(orderId: string, status: string, trackingId?: string): Promise<Order | undefined>;

  // Testimonials
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Users
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category> = new Map();
  private designs: Map<number, Design> = new Map();
  private orders: Map<string, Order> = new Map();
  private testimonials: Map<number, Testimonial> = new Map();
  private users: Map<number, User> = new Map();
  private currentCategoryId = 1;
  private currentDesignId = 1;
  private currentOrderId = 1;
  private currentTestimonialId = 1;
  private currentUserId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoryData = [
      {
        name: "Neckline Designs",
        slug: "neckline",
        description: "Intricate neckline embroidery patterns",
        imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        designCount: 45
      },
      {
        name: "Borders",
        slug: "borders",
        description: "Traditional border patterns with floral motifs",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        designCount: 32
      },
      {
        name: "Shawls",
        slug: "shawls",
        description: "Beautiful shawl designs with paisley patterns",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        designCount: 28
      },
      {
        name: "Sleeves",
        slug: "sleeves",
        description: "Elegant sleeve embroidery designs",
        imageUrl: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        designCount: 38
      },
      {
        name: "Floral",
        slug: "floral",
        description: "Detailed floral embroidery patterns",
        imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        designCount: 52
      },
      {
        name: "Pheran",
        slug: "pheran",
        description: "Traditional Kashmiri pheran designs",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        designCount: 21
      }
    ];

    categoryData.forEach(cat => {
      const category: Category = { 
        id: this.currentCategoryId++,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || null,
        imageUrl: cat.imageUrl || null,
        designCount: cat.designCount || 0
      };
      this.categories.set(category.id, category);
    });

    // Seed designs
    const designData: InsertDesign[] = [
      {
        name: "Golden Paisley Neckline",
        description: "Intricate paisley patterns with gold thread work perfect for formal kurtas and pherans.",
        categoryId: 1,
        imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        additionalImages: [],
        priceMin: 2500,
        priceMax: 4200,
        estimatedDays: 8,
        isPopular: true,
        isFeatured: true,
        placement: "Neckline",
        fabricTypes: ["Cotton", "Silk", "Georgette"]
      },
      {
        name: "Rose Garden Border",
        description: "Delicate rose motifs with vine patterns, ideal for shawl and dupatta borders.",
        categoryId: 2,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        additionalImages: [],
        priceMin: 1800,
        priceMax: 3500,
        estimatedDays: 6,
        isPopular: true,
        isFeatured: true,
        placement: "Border",
        fabricTypes: ["Silk", "Chiffon", "Cotton"]
      },
      {
        name: "Chinar Leaf Sleeves",
        description: "Iconic chinar leaf motifs with traditional color combinations for sleeve embellishments.",
        categoryId: 4,
        imageUrl: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        additionalImages: [],
        priceMin: 2200,
        priceMax: 3800,
        estimatedDays: 7,
        isPopular: false,
        isFeatured: true,
        placement: "Sleeves",
        fabricTypes: ["Cotton", "Linen", "Silk"]
      },
      {
        name: "Royal Shawl Pattern",
        description: "Full coverage design with royal motifs and premium gold thread work for special occasions.",
        categoryId: 3,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        additionalImages: [],
        priceMin: 4500,
        priceMax: 7200,
        estimatedDays: 12,
        isPopular: false,
        isFeatured: true,
        placement: "All Over",
        fabricTypes: ["Pashmina", "Silk", "Wool"]
      }
    ];

    designData.forEach(design => {
      const newDesign: Design = { 
        id: this.currentDesignId++,
        name: design.name,
        description: design.description,
        categoryId: design.categoryId || null,
        imageUrl: design.imageUrl,
        additionalImages: design.additionalImages || [],
        priceMin: design.priceMin,
        priceMax: design.priceMax,
        estimatedDays: design.estimatedDays,
        isPopular: design.isPopular || false,
        isFeatured: design.isFeatured || false,
        placement: design.placement || null,
        fabricTypes: design.fabricTypes || [],
        createdAt: new Date()
      };
      this.designs.set(newDesign.id, newDesign);
    });

    // Seed testimonials
    const testimonialData: InsertTestimonial[] = [
      {
        name: "Priya Sharma",
        location: "Mumbai, Maharashtra",
        text: "The embroidery work on my wedding shawl was absolutely breathtaking. The attention to detail and traditional craftsmanship exceeded all my expectations. It became the highlight of my special day!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isActive: true
      },
      {
        name: "Anjali Gupta",
        location: "Delhi, India",
        text: "I sent my grandmother's old kurta for restoration and embroidery. The team not only preserved its sentimental value but enhanced it beautifully. The courier process was so smooth and secure.",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isActive: true
      },
      {
        name: "Meera Reddy",
        location: "Bangalore, Karnataka",
        text: "The floral border design on my silk dupatta is simply stunning. The color combination they suggested was perfect, and the quality of thread work is museum-worthy. Highly recommend!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        isActive: true
      }
    ];

    testimonialData.forEach(testimonial => {
      const newTestimonial: Testimonial = { 
        id: this.currentTestimonialId++,
        name: testimonial.name,
        location: testimonial.location,
        text: testimonial.text,
        rating: testimonial.rating,
        imageUrl: testimonial.imageUrl || null,
        isActive: testimonial.isActive !== false
      };
      this.testimonials.set(newTestimonial.id, newTestimonial);
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory: Category = { 
      id: this.currentCategoryId++,
      name: category.name,
      slug: category.slug,
      description: category.description || null,
      imageUrl: category.imageUrl || null,
      designCount: 0
    };
    this.categories.set(newCategory.id, newCategory);
    return newCategory;
  }

  async getDesigns(filters?: {
    categoryId?: number;
    priceMin?: number;
    priceMax?: number;
    sortBy?: 'popular' | 'newest' | 'price_asc' | 'price_desc';
  }): Promise<Design[]> {
    let designs = Array.from(this.designs.values());

    if (filters?.categoryId) {
      designs = designs.filter(d => d.categoryId === filters.categoryId);
    }

    if (filters?.priceMin) {
      designs = designs.filter(d => d.priceMax >= filters.priceMin!);
    }

    if (filters?.priceMax) {
      designs = designs.filter(d => d.priceMin <= filters.priceMax!);
    }

    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'popular':
          designs.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
          break;
        case 'newest':
          designs.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
          break;
        case 'price_asc':
          designs.sort((a, b) => a.priceMin - b.priceMin);
          break;
        case 'price_desc':
          designs.sort((a, b) => b.priceMax - a.priceMax);
          break;
      }
    }

    return designs;
  }

  async getDesignById(id: number): Promise<Design | undefined> {
    return this.designs.get(id);
  }

  async getFeaturedDesigns(): Promise<Design[]> {
    return Array.from(this.designs.values()).filter(d => d.isFeatured);
  }

  async getDesignsByCategory(categoryId: number): Promise<Design[]> {
    return Array.from(this.designs.values()).filter(d => d.categoryId === categoryId);
  }

  async createDesign(design: InsertDesign): Promise<Design> {
    const newDesign: Design = { 
      id: this.currentDesignId++,
      name: design.name,
      description: design.description,
      categoryId: design.categoryId || null,
      imageUrl: design.imageUrl,
      additionalImages: design.additionalImages || [],
      priceMin: design.priceMin,
      priceMax: design.priceMax,
      estimatedDays: design.estimatedDays,
      isPopular: design.isPopular || false,
      isFeatured: design.isFeatured || false,
      placement: design.placement || null,
      fabricTypes: design.fabricTypes || [],
      createdAt: new Date()
    };
    this.designs.set(newDesign.id, newDesign);
    return newDesign;
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    return this.orders.get(orderId);
  }

  async getOrderByEmailAndPhone(email: string, phone: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      o => o.customerEmail === email && o.customerPhone === phone
    );
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const orderId = `KTW${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const orderId = `KTW${Date.now()}${Math.floor(Math.random() * 1000)}`;
    // Ensure all fields of Order are correctly populated, especially new optional ones
    const newOrder: Order = {
      // Explicitly list all required fields from InsertOrder
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress,
      garmentType: order.garmentType,
      totalAmount: order.totalAmount,
      advanceAmount: order.advanceAmount,
      // Optional fields from InsertOrder
      designId: order.designId === undefined ? null : order.designId,
      customDesignUrl: order.customDesignUrl === undefined ? null : order.customDesignUrl,
      garmentImageUrl: order.garmentImageUrl === undefined ? null : order.garmentImageUrl,
      sizeNotes: order.sizeNotes === undefined ? null : order.sizeNotes,
      comments: order.comments === undefined ? null : order.comments,
      status: order.status || "awaiting_cloth", // Default if not provided
      trackingId: order.trackingId === undefined ? null : order.trackingId,
      courierPartner: order.courierPartner === undefined ? null : order.courierPartner,
      estimatedDelivery: order.estimatedDelivery === undefined ? null : order.estimatedDelivery,
      userId: order.userId === undefined ? null : order.userId, // Handle new userId
      // Fields generated by MemStorage
      id: this.currentOrderId++,
      orderId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(orderId, newOrder);
    return newOrder;
  }

  async updateOrderStatus(orderId: string, status: string, trackingId?: string): Promise<Order | undefined> {
    const order = this.orders.get(orderId);
    if (!order) return undefined;

    const updatedOrder: Order = { 
      ...order, 
      status, 
      trackingId: trackingId || order.trackingId,
      updatedAt: new Date()
    };
    this.orders.set(orderId, updatedOrder);
    return updatedOrder;
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.isActive);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = { ...testimonial, id: this.currentTestimonialId++ };
    this.testimonials.set(newTestimonial.id, newTestimonial);
    return newTestimonial;
  }

  async createUser(user: InsertUser): Promise<User> {
    if (Array.from(this.users.values()).find(u => u.email === user.email)) {
      throw new Error("Email already exists");
    }
    const newUser: User = {
      id: this.currentUserId++,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role || 'user',
      createdAt: new Date(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }

  async getDesigns(filters?: {
    categoryId?: number;
    priceMin?: number;
    priceMax?: number;
    sortBy?: 'popular' | 'newest' | 'price_asc' | 'price_desc';
  }): Promise<Design[]> {
    let query = db.select().from(designs);
    
    if (filters?.categoryId) {
      query = query.where(eq(designs.categoryId, filters.categoryId));
    }
    
    return await query;
  }

  async getDesignById(id: number): Promise<Design | undefined> {
    const [design] = await db.select().from(designs).where(eq(designs.id, id));
    return design || undefined;
  }

  async getFeaturedDesigns(): Promise<Design[]> {
    return await db.select().from(designs).where(eq(designs.isFeatured, true));
  }

  async getDesignsByCategory(categoryId: number): Promise<Design[]> {
    return await db.select().from(designs).where(eq(designs.categoryId, categoryId));
  }

  async createDesign(design: InsertDesign): Promise<Design> {
    const [newDesign] = await db
      .insert(designs)
      .values(design)
      .returning();
    return newDesign;
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.orderId, orderId));
    return order || undefined;
  }

  async getOrderByEmailAndPhone(email: string, phone: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(and(eq(orders.customerEmail, email), eq(orders.customerPhone, phone)));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db
      .insert(orders)
      .values(order)
      .returning();
    return newOrder;
  }

  async updateOrderStatus(orderId: string, status: string, trackingId?: string): Promise<Order | undefined> {
    const updateData: any = { status, updatedAt: new Date() };
    if (trackingId) {
      updateData.trackingId = trackingId;
    }

    const [updatedOrder] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.orderId, orderId))
      .returning();
    
    return updatedOrder || undefined;
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.isActive, true));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db
      .insert(users)
      .values(user)
      .returning();
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }
}

export const storage = new DatabaseStorage();
