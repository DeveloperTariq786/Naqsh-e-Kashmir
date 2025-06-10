import HeroBanner from "@/components/hero-banner";
import FeaturedCategories from "@/components/featured-categories";
import FeaturedDesigns from "@/components/featured-designs";
import HowItWorks from "@/components/how-it-works";
import MotifsSection from "@/components/motifs-section";
import Testimonials from "@/components/testimonials";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <FeaturedDesigns />
      <MotifsSection />
      <HowItWorks />
      <Testimonials />
      <WhatsAppFloat />
    </>
  );
}
