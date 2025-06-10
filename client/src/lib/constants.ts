export const WHATSAPP_NUMBER = "+919876543210";
export const COMPANY_EMAIL = "info@kashmirellaworks.com";
export const COMPANY_ADDRESS = "Srinagar, Kashmir, India";

export const ORDER_STATUSES = {
  awaiting_cloth: "Awaiting Cloth",
  cloth_received: "Cloth Received", 
  work_in_progress: "Work in Progress",
  shipped_back: "Shipped Back",
  completed: "Completed"
} as const;

export const GARMENT_TYPES = [
  "Shawl",
  "Pheran", 
  "Kurta",
  "Dupatta",
  "Saree",
  "Others"
] as const;

export const FABRIC_TYPES = [
  "Cotton",
  "Silk",
  "Georgette",
  "Chiffon",
  "Linen",
  "Pashmina",
  "Wool"
] as const;

export const SORT_OPTIONS = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" }
] as const;
