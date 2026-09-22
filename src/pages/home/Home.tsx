import { AnnouncementBanner } from "@/components/organisms/landing/AnnouncementBanner";
import { Collaboration } from "@/components/organisms/landing/Collaboration";
import { CTA } from "@/components/organisms/landing/CTA";
import { Features } from "@/components/organisms/landing/Features";
import { Footer } from "@/components/organisms/landing/Footer";
import { Hero } from "@/components/organisms/landing/Hero";
import { Navbar } from "@/components/organisms/landing/Navbar";
import { ProductShowcase } from "@/components/organisms/landing/ProductShowcase";
import { V2Preview } from "@/components/organisms/landing/V2Preview";
import { WhyRelay } from "@/components/organisms/landing/WhyRelay";

export const Home = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <AnnouncementBanner />

            <Navbar />

            <main>
                <Hero />

                <ProductShowcase />

                <Features />

                <Collaboration />

                <WhyRelay />

                <V2Preview />

                <CTA />
            </main>

            <Footer />
        </div>
    );
};