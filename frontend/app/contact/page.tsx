import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactContainer from '@/containers/contact/Contact';

export default function Contact() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="px-30 py-6">
       <ContactContainer />
      </div>
      <Footer />
    </main>
  );
}