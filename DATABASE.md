# Database Operations Guide

This guide explains how to handle database migrations and seeding in this project.

## Database Migrations

This project uses Drizzle ORM with PostgreSQL (Neon database). The database schema is defined in `shared/schema.ts`.

### Generate Migrations

To generate a new migration based on your schema changes:

```bash
npx drizzle-kit generate
```

This will create a new migration file in the `migrations` folder.

### Apply Migrations

To push your migrations to the database:

```bash
npm run db:push
```

### Migration Files Location

- Migration files are stored in the `migrations` folder
- Migration metadata is stored in `migrations/meta`
- Each migration file is numbered (e.g., `0000_sudden_phantom_reporter.sql`)

## Database Seeding

The project includes a seeding system to populate the database with initial data. The seed script is located in `server/seed.ts`.

### Running the Seed Script

To seed your database:

```bash
npm run seed
```

### What Gets Seeded

The seed script will:

1. Clear existing data to avoid conflicts
2. Insert 5 categories:
   - Neckline Designs
   - Border Designs
   - Shawl Designs
   - Sleeve Designs
   - Floral Patterns

3. Insert 5 designs:
   - Golden Paisley Neckline
   - Rose Garden Border
   - Chinaar Leaf Shawl
   - Floral Sleeve Panel
   - Traditional Lotus Design

4. Insert 3 testimonials with customer reviews

### Seed Data Structure

The seed data is organized in three main sections:

1. Categories:
```typescript
{
  name: string;
  slug: string;
  description: string;
}
```

2. Designs:
```typescript
{
  name: string;
  description: string;
  categoryId: number;
  imageUrl: string;
  additionalImages: string[];
  priceMin: number;
  priceMax: number;
  estimatedDays: number;
  isPopular: boolean;
  isFeatured: boolean;
  placement: string;
  fabricTypes: string[];
}
```

3. Testimonials:
```typescript
{
  name: string;
  imageUrl: string;
  location: string;
  text: string;
  rating: number;
  isActive: boolean;
}
```

## Important Notes

- Always backup your data before running migrations in production
- Test migrations locally first
- The seed script will DELETE existing data before inserting new data
- Don't run the seed script in production unless you specifically want to reset all data
- Make sure your `.env` file contains the correct `DATABASE_URL`

## Troubleshooting

If you encounter duplicate key errors when seeding:
- The seed script automatically clears existing data
- If errors persist, check if there are any remaining constraints or data in the database
- You can manually clear tables using the Drizzle ORM commands:
```typescript
await db.delete(designs);
await db.delete(categories);
await db.delete(testimonials);
```
