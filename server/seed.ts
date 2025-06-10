import { db } from "./db";
import { categories, designs, testimonials, motifs } from "@shared/schema";

async function seed() {
  console.log("🌱 Starting seed process...");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(designs);
  await db.delete(categories);
  await db.delete(testimonials);
  await db.delete(motifs);
  console.log("✅ Existing data cleared");

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

  const insertedTestimonials = await db.insert(testimonials).values(testimonialData).returning();
  console.log(`✅ Inserted ${insertedTestimonials.length} testimonials`);

  // Seed motifs
  const motifData = [
    {
      name: "Floral",
      description: "Traditional Kashmiri flowers",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      category: "Traditional",
      complexity: "Medium",
      applications: ["Neckline", "Border", "All-over"],
    },
    {
      name: "Chinar Leaf",
      description: "Iconic maple leaf patterns",
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      category: "Nature",
      complexity: "Medium",
      applications: ["Border", "All-over", "Shawl"],
    },
    {
      name: "Paisley Buti",
      description: "Classic paisley motifs",
      imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      category: "Classic",
      complexity: "High",
      applications: ["All-over", "Border", "Neckline"],
    },
    {
      name: "Geometric",
      description: "Modern geometric patterns",
      imageUrl: "https://images.unsplash.com/photo-1583391733981-6c1c6a8b93ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      category: "Contemporary",
      complexity: "Medium",
      applications: ["Border", "Sleeve", "Panel"],
    },
    {
      name: "Rose Garden",
      description: "Delicate rose patterns",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      category: "Floral",
      complexity: "High",
      applications: ["All-over", "Border", "Neckline"],
    },
    {
      name: "Vine Border",
      description: "Elegant vine patterns",
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      category: "Border",
      complexity: "Medium",
      applications: ["Border", "Sleeve", "Hem"],
    }
  ];

  const insertedMotifs = await db.insert(motifs).values(motifData).returning();
  console.log(`✅ Inserted ${insertedMotifs.length} motifs`);

  console.log("🎉 Database seeding completed successfully!");
}

seed().catch(console.error);