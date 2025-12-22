import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutContainer from '@/containers/about/About';

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="px-30 py-6">
       <AboutContainer />
      </div>
      <Footer />
    </main>
  );
}