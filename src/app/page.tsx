import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EffectsShowcase from "@/components/EffectsShowcase";
import UseCases from "@/components/UseCases";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-900">
      <NavBar />
      <Hero />
      <main className="relative z-10">
        <Features />
        <EffectsShowcase />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
}
