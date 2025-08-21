import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import BrandsSection from "@/components/BrandsSection";
import ModelsSection from "@/components/ModelsSection";
import FeaturesSection from "@/components/FeaturesSection";
import EffectsSection from "@/components/EffectsSection";
import TextToVideoSection from "@/components/TextToVideoSection";
import MobileAppSection from "@/components/MobileAppSection";
import UsersSection from "@/components/UsersSection";
import FAQSection from "@/components/FAQSection";
import FinalFooter from "@/components/FinalFooter";
import SEOContent from "@/components/SEOContent";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black">
      <NavBar />
      <Hero />
      <main className="relative z-10">
        <BrandsSection />
        <ModelsSection />
        <FeaturesSection />
        <SEOContent />
        <EffectsSection />
        <TextToVideoSection />
        <MobileAppSection />
        <UsersSection />
        <FAQSection />
      </main>
      <FinalFooter />
    </div>
  );
}
