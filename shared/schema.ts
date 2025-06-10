import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  designCount: integer("design_count").default(0),
});

export const designs = pgTable("designs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  imageUrl: text("image_url").notNull(),
  additionalImages: text("additional_images").array().default([]),
  priceMin: integer("price_min").notNull(),
  priceMax: integer("price_max").notNull(),
  estimatedDays: integer("estimated_days").notNull(),
  isPopular: boolean("is_popular").default(false),
  isFeatured: boolean("is_featured").default(false),
  placement: text("placement"),
  fabricTypes: text("fabric_types").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address").notNull(),
  designId: integer("design_id").references(() => designs.id),
  customDesignUrl: text("custom_design_url"),
  garmentType: text("garment_type").notNull(),
  garmentImageUrl: text("garment_image_url"),
  sizeNotes: text("size_notes"),
  comments: text("comments"),
  totalAmount: integer("total_amount").notNull(),
  advanceAmount: integer("advance_amount").notNull(),
  status: text("status").notNull().default("awaiting_cloth"),
  trackingId: text("tracking_id"),
  courierPartner: text("courier_partner"),
  estimatedDelivery: timestamp("estimated_delivery"),
  userId: integer("user_id").references(() => users.id), // Nullable for now
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  designCount: true,
});

export const insertDesignSchema = createInsertSchema(designs).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  orderId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export type Category = typeof categories.$inferSelect;
export type Design = typeof designs.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertDesign = z.infer<typeof insertDesignSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
