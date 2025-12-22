import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/containers/home/HeroSection';
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div>
        <HeroSection />
      </div>
      <Footer />
    </main>
  );
}
