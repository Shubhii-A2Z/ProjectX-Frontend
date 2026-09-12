import { AnnouncementBanner } from "@/components/organisms/landing/AnnouncementBanner";
import { Collaboration } from "@/components/organisms/landing/Collaboration";
import { CTA } from "@/components/organisms/landing/CTA";
import { Features } from "@/components/organisms/landing/Features";
import { Footer } from "@/components/organisms/landing/Footer";
import { Hero } from "@/components/organisms/landing/Hero";
import { Navbar } from "@/components/organisms/landing/Navbar";
import { PricingPreview } from "@/components/organisms/landing/PricingPreview";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <AnnouncementBanner/>
      
      <Navbar />

      <main>

        <Hero />

        <Features />

        <Collaboration />

        <PricingPreview />

        <CTA />
      </main>

      <Footer />

    </div>
  );
};