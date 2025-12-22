import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Filters from '@/containers/products/Filters';
import ProductGrid from '@/containers/products/ProductGrid';

export default function Products() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="px-30 py-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/4">
            <Filters />
          </div>
          <div className="w-full lg:w-3/4">
            <ProductGrid />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
