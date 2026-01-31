import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/containers/home/HeroSection';
import ProductGrid from '@/containers/home/TrendingProductGrid';
import FeatureBanner from '@/containers/home/FeatureBanner';
import CTASection from '@/containers/home/CTASection';
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div>
        <HeroSection />
        <ProductGrid />
        <FeatureBanner />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
