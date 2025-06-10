import { 
  categories, designs, orders, testimonials, users, motifs,
  type Category, type Design, type Order, type Testimonial, type User, type Motif,
  type InsertCategory, type InsertDesign, type InsertOrder, type InsertTestimonial, type InsertUser, type InsertMotif
} from "@shared/schema";
import { db } from "./db";
import { eq, and, SQL } from "drizzle-orm";

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

  // Motifs
  getMotifs(filters?: { category?: string; complexity?: string }): Promise<Motif[]>;
  getMotifById(id: number): Promise<Motif | undefined>;
  createMotif(motif: InsertMotif): Promise<Motif>;
}

// MemStorage class has been removed. DatabaseStorage is now the sole implementation.

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
      // Ensure correct type for query.where if it's assigned back
      query = query.where(eq(designs.categoryId, filters.categoryId)) as any;
    }
    // Add other filters for priceMin, priceMax, sortBy if needed, ensuring proper chaining
    // For example:
    // if (filters?.priceMin !== undefined) {
    //   query = query.where(gte(designs.priceMax, filters.priceMin)) as any;
    // }
    // if (filters?.priceMax !== undefined) {
    //   query = query.where(lte(designs.priceMin, filters.priceMax)) as any;
    // }
    // Add sorting logic if filters.sortBy is present
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
    const updateData: Partial<Order> = { status, updatedAt: new Date() };
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

  // Motifs DatabaseStorage
  async getMotifs(filters?: { category?: string; complexity?: string }): Promise<Motif[]> {
    const conditions: SQL[] = [];
    if (filters?.category) {
      conditions.push(eq(motifs.category, filters.category));
    }
    if (filters?.complexity) {
      conditions.push(eq(motifs.complexity, filters.complexity));
    }

    let query = db.select().from(motifs);
    if (conditions.length > 0) {
      // Ensure correct type for query.where if it's assigned back
      query = query.where(and(...conditions)) as any;
    }
    return await query;
  }

  async getMotifById(id: number): Promise<Motif | undefined> {
    const [motif] = await db.select().from(motifs).where(eq(motifs.id, id));
    return motif || undefined;
  }

  async createMotif(motif: InsertMotif): Promise<Motif> {
    const [newMotif] = await db
      .insert(motifs)
      .values(motif)
      .returning();
    return newMotif;
  }
}

export const storage = new DatabaseStorage();
