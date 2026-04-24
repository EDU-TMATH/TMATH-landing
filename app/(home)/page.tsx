import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import PathwayCards from "@/app/components/PathwayCards";
import PlatformSection from "@/app/components/PlatformSection";
import AchievementsSection from "@/app/components/AchievementsSection";
import FeaturedStudents from "@/app/components/FeaturedStudents";
import CTASection from "@/app/components/CTASection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="hero-grid absolute inset-0 -z-20" />
      <div className="float-orb absolute -top-24 -left-16 -z-10 h-72 w-72 rounded-full bg-[#ffdca8] blur-3xl" />
      <div className="float-orb absolute top-32 -right-16 -z-10 h-80 w-80 rounded-full bg-[#9dd8ff] blur-3xl [animation-delay:0.8s]" />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pt-10 sm:px-10 lg:px-16 pb-14">
        <Header />

        <HeroSection />

        <PathwayCards />

        <PlatformSection />

        <AchievementsSection />

        <FeaturedStudents />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
