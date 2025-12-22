import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Products() {
    const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div>
        <Breadcrumbs items={breadcrumbItems} />
       
      </div>
      <Footer />
    </main>
  );
}