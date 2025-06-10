import { db } from "./db";
import { categories, designs, testimonials } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed categories
  const categoryData = [
    {
      name: "Neckline Designs",
      slug: "neckline",
      description: "Beautiful embroidery patterns for necklines and collars"
    },
    {
      name: "Border Designs", 
      slug: "borders",
      description: "Elegant border patterns for dupatta and saree edges"
    },
    {
      name: "Shawl Designs",
      slug: "shawls", 
      description: "Intricate all-over patterns for shawls and wraps"
    },
    {
      name: "Sleeve Designs",
      slug: "sleeves",
      description: "Decorative patterns for sleeve cuffs and panels"
    },
    {
      name: "Floral Patterns",
      slug: "floral",
      description: "Traditional Kashmiri floral motifs and designs"
    }
  ];

  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log(`✅ Inserted ${insertedCategories.length} categories`);

  // Seed designs
  const designData = [
    {
      name: "Golden Paisley Neckline",
      description: "Traditional paisley motifs with golden thread work on neckline",
      categoryId: insertedCategories[0].id,
      imageUrl: "https://images.unsplash.com/photo-1583391733981-6c1c6a8b93ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      additionalImages: [
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      ],
      priceMin: 2500,
      priceMax: 4000,
      estimatedDays: 7,
      isPopular: true,
      isFeatured: true,
      placement: "Neckline",
      fabricTypes: ["Cotton", "Silk", "Georgette"]
    },
    {
      name: "Rose Garden Border",
      description: "Delicate rose motifs perfect for dupatta and saree borders",
      categoryId: insertedCategories[1].id,
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      additionalImages: [
        "https://images.unsplash.com/photo-1583391733981-6c1c6a8b93ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
      ],
      priceMin: 1800,
      priceMax: 3200,
      estimatedDays: 5,
      isPopular: true,
      isFeatured: true,
      placement: "Border",
      fabricTypes: ["Silk", "Chiffon", "Georgette"]
    },
    {
      name: "Chinaar Leaf Shawl",
      description: "All-over chinar leaf pattern for premium shawls",
      categoryId: insertedCategories[2].id,
      imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      additionalImages: [],
      priceMin: 8000,
      priceMax: 15000,
      estimatedDays: 14,
      isPopular: false,
      isFeatured: true,
      placement: "All-over",
      fabricTypes: ["Pashmina", "Wool", "Silk"]
    },
    {
      name: "Floral Sleeve Panel",
      description: "Elegant floral embroidery for sleeve panels and cuffs",
      categoryId: insertedCategories[3].id,
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      additionalImages: [],
      priceMin: 1500,
      priceMax: 2800,
      estimatedDays: 4,
      isPopular: true,
      isFeatured: false,
      placement: "Sleeve",
      fabricTypes: ["Cotton", "Silk"]
    },
    {
      name: "Traditional Lotus Design",
      description: "Sacred lotus motifs with traditional Kashmiri styling",
      categoryId: insertedCategories[4].id,
      imageUrl: "https://images.unsplash.com/photo-1583391733981-6c1c6a8b93ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      additionalImages: [],
      priceMin: 3000,
      priceMax: 5500,
      estimatedDays: 9,
      isPopular: false,
      isFeatured: false,
      placement: "Center",
      fabricTypes: ["Silk", "Cotton"]
    }
  ];

  const insertedDesigns = await db.insert(designs).values(designData).returning();
  console.log(`✅ Inserted ${insertedDesigns.length} designs`);

  // Seed testimonials
  const testimonialData = [
    {
      name: "Priya Sharma",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      location: "Mumbai, Maharashtra",
      text: "The embroidery work on my wedding lehenga was absolutely stunning. The artisans at Kashmir Tella Works are truly masters of their craft.",
      rating: 5,
      isActive: true
    },
    {
      name: "Anjali Gupta",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      location: "Delhi",
      text: "I ordered a custom neckline design and the quality exceeded my expectations. Beautiful traditional work with modern finishing.",
      rating: 5,
      isActive: true
    },
    {
      name: "Meera Joshi",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
      location: "Bangalore, Karnataka",
      text: "The attention to detail and authentic Kashmiri craftsmanship is remarkable. Highly recommend for anyone looking for quality embroidery.",
      rating: 5,
      isActive: true
    }
  ];

  const insertedTestimonials = await db.insert(testimonials).values(testimonialData).returning();
  console.log(`✅ Inserted ${insertedTestimonials.length} testimonials`);

  console.log("🎉 Database seeding completed successfully!");
}

seed().catch(console.error);