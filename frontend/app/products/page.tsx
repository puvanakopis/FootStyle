import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Filters from '@/containers/products/Filters';

export default function Products() {
    const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className='px-30'>
        <Breadcrumbs items={breadcrumbItems} />
        <Filters/>
       
      </div>
      <Footer />
    </main>
  );
}