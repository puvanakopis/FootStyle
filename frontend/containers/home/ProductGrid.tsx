"use client";

import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  rating: string;
  imageUrl: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Urban Runner X",
    category: "Running & Training",
    oldPrice: "Rs 150.00",
    price: "Rs 120.00",
    rating: "4.8",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfAw06J4ob_Kzi3zWFyg_SIyfrrNDW9cttIrZUcd5jul_AkiHP2Ovldz-Zp-wfdj6ZZKebGIiCxpPY7AzhCRL0VvH7p8WWHQ-Il6QAT-l0pTve_zvp7SLph7FjcQf0AwcDQNzn4P87pi2opNovNQ0mTKRQPjsvp6nzra0PsenNNugTAAWgNne3qJbXx3Yl3Y1IAqhe6HQb4PDfB7Izj4hJrtzARdx4pNIq57KIsc8FMN_2_O3JBvN9KwJ0jDyAtIJddUgDlAN6PwvT",
  },
  {
    id: 2,
    name: "Classic Court High",
    category: "Lifestyle",
    oldPrice: "Rs 110.00",
    price: "Rs 95.00",
    rating: "4.9",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvMnBiqUEbrRMAaG4zi20WsEWcyUFGDF-nIqBm91x2RwMZRv2DBKxNc4q6wK60r14GFaru8IgCBKgzJ09IQ2lJvQVwzFEEBm0i3EqT6wEF-Ors19_bML_FgapRrmMHipZNJBu_0XVwJDdaYdzSdVAQ2Xuoao4dqNEtv3GBg_rTE2pc_mGNSDdr4XTYe05j18BDP6Un5Ub7Ww4tdtWuIMzTnbBEo7-9pT1_-ZW4K97BR4giGgsVOCKLTpINBsuzF5kjQHv1CVZKEwdh",
    badge: "Sale",
  },
  {
    id: 3,
    name: "Street Breeze Air",
    category: "Streetwear",
    oldPrice: "Rs 160.00",
    price: "Rs 140.00",
    rating: "4.5",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-usPSGQKNi79Vx-MA31KL0DHsqukdjr2wMxg4s4zNGa1XRuU5ili2H-VvOEatXsdsMV4MqFr8PvhUkcHh8aP30K0gZyHsYkDEgmYMkUnnGy6qhFDuWr81jjbVj_bybsET38aqcv08nWch6Udirf-Pi5fhRlGQx96V79jSiQrBb8tfRmlzkqrD-CJRvpgNQj0-SJuyfiFYCaOb730hdvxzUvF_yNhgvezYU9MUqaVwrEaRZ12saLmNFLXe6unr5Zj0OADu0OrdUOhJ",
  },
  {
    id: 4,
    name: "Marathon Pro",
    category: "Professional",
    oldPrice: "Rs 130.00",
    price: "Rs 110.00",
    rating: "5.0",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaIS8k6Xorj9XuXLgRvAAjX5pmPq-HtuP6Q_MVK52KHrV4sOdWNsqzf3Abspm6bf8PKoCB_17u7b9nO3iD3asqKp_k0qHms5Z88A1HRSCU7_zojs3-hTq-b7-cvA12iiJ011AtXjb6cNg257DQigqNLpQpsaM9mtpiWTWShGwoHU0EZEsJX1MXazfE_lNtIJpQl8NwPnj_rjhHdZM7AkjrqSKUxR4dhUvazmhicoY0B12UgZYJrF6LgMMKYyDUjWmjemW9NKbZuhil",
  },
];

const ProductGrid = () => {
  return (
    <>
      <SectionHeader title="Trending Now" linkText="View All Products" linkHref="/products" />
      <section className="flex justify-center px-4 py-8 md:px-10">
        <div className="w-full max-w-[1280px]">
          <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <button className="rounded-lg border border-[#e6d0d5] px-6 py-2.5 text-sm font-bold text-text-main-light hover:bg-white">
              View All Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;