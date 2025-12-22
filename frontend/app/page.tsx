import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
  <div className="text-4xl font-bold text-center mt-16 h-200 flex items-center justify-center">
  Foot Style
</div>
      <Footer />
    </main>
  );
}
