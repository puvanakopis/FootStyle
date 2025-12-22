"use client";

import { useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  alt: string;
  rating: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Zoom Pegasus",
    category: "Running",
    price: 120,
    badge: "NEW",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt3NRdPC4Ea281c8eFUXYf5M8kxa9bkQRX0PUsJ_gJI8q2iXBVztn4tdkuWfZ-im-zP3jUwdWN-pK61uogpgfPPAoVnejWfy2KafdF7LWlQ0CIwNNFufKf-A9bpcJRdXmtWsSMQicMirsodr0VTFwZidVjvWRtoDmEQkAoofaBX9pyyzI4mFjulEBaOobxAVeucM0AhmXMxQ6tR77xlFQfm9Jz_LTfr6yrEG8UtiWUCX5rOwcnZkxBavdsJFELDhGg0aHHfHITpisp",
    alt: "Red athletic running shoe on a plain background",
    rating: "4.8",
  },
  {
    id: 2,
    name: "Adidas Ultraboost Light",
    category: "Trail",
    price: 144,
    oldPrice: 180,
    badge: "-20%",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcluEd2pA_7FfAqzjMydPHvhRYxD-Ay13EN8Ou9Hu1lrYM4yMykqM0g7Whk6iRgvTtDX5UsrC0foiffTtHdRGSTU7CV74GPFMtg2Jr4Kz7wK2m6Ay6gyy1IjN0Ybol9iu0YJM74myPcFvPayoxRc0BhzOl7fDHIqQVF6fI0lgicmnV4yLIHKvbYoFJymFa_knyWog-w2d_AfoMRVvod8XZTHtF_ji_Oc2__biwZUsv_lshRp5jJLYqZMJERGFZ4WPjQ6RWQiJ7JyPk",
    alt: "Green and white retro running shoe on a plain background",
    rating: "4.5",
  },
  {
    id: 3,
    name: "New Balance Fresh Foam",
    category: "Road",
    price: 160,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrSvJ8D7MxltYLYoRL2G7-pCIDk0UHj7z9u2TLMzsBTqVH632AhO3fGWFIRC2sRtXnx1Et7KfWPw_WhbLgDHAx_pwFc_61queazFMiP0E1rAzTfPzz3FoPnLR4vS-RI98t0-ZEXUcrZ1kpCFcKpay6PEKSsSoSwT-7fvStCMBVbwHhZj7PUMzluJ_owENyTu7itnsoPOGPGhi3jpxAwx5uAMzKui8fqgLKIpjHkIRK8jF8s_jy0Pv3-ChkowUC5gTjRyKWUoE7pBWU",
    alt: "High-top blue and white basketball shoe",
    rating: "4.7",
  },
  {
    id: 4,
    name: "Puma Velocity Nitro 2",
    category: "Training",
    price: 110,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI3eBnCVLgiFImClnAztz0IVOrTbwTVqEcK6vyn416-1Jkwl3mrU7fUY34oXzeKHhpdk5Xu5Sc10QsfNtVbJP-KXv0E9sXF5hwdzueMkrF_7tx_-qkA7uNkR_0EV-q0mFhFq-8BKusPpZMoQ8aeFF7FS28iSiTU-F6VhVRIttYWioFxsqpvWcVcBHwBeoyAXP29nWs3Zy25xtBIOcU9D-eHkYiwI4hVIjQ9Rvb9zMEfI_iJEEPUP1PKuOACHRcI7ccTa0T9-12fHTF",
    alt: "Futuristic white sneaker with colorful sole on purple background",
    rating: "4.3",
  },
  {
    id: 5,
    name: "Hoka Clifton 9",
    category: "Cushion",
    price: 145,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9HRq2wRBNapJlqkcu19bZaunKtgId5ryo7OuddMfvs5lxmUHsSwBjdR9L-52JUmJcjuOrUDJEfJCVWC4py2NZW1mqfWyljPg5UdEzvwPgfNSmZOOELq5IMylMNhC4gMnTD2grNAY16YjyahW_dm5BMZrfNX-hmAFlaiiuU18CfrcC1quTdtgxOE92_V6s0O41lB8qikq1hbDz8TTPpVtLL_-SE69jEgyO5odREVnGUpchz_GwOYJuXqc0ayrVSxNOmaYijSg20rx9",
    alt: "Black mesh running shoe on dark background",
    rating: "4.6",
  },
  {
    id: 6,
    name: "Brooks Ghost 15",
    category: "Road",
    price: 140,
    badge: "HOT",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHeXfZrFCEXjUQIfYUfXDMw6vpf7OYjJepcpzJQGiwh_WG56bGYmc2l6PWQKI_yUIwxttWHWopK_I0j4XL7PZH6qkYC74TfI336xMetiM14t0xx_vuVmskGW9WWQ-Au7iwMtkdn7uWHTIM-8a_rpkyKcAH8PxhTzqipWkw_wCSJLqNOfgAbo2M_cmgNlac2Biv_eHi5w7m0WdCo3SXWUnL6D_NKrpvBcHHAAS5YdMA--yMreKL95pIR1Hyra1Ooj5u5Tr8jGIUB6ih",
    alt: "Pair of brown leather casual sneakers",
    rating: "4.9",
  },
  {
    id: 7,
    name: "Nike Zoom Fly",
    category: "Running",
    price: 130,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt3NRdPC4Ea281c8eFUXYf5M8kxa9bkQRX0PUsJ_gJI8q2iXBVztn4tdkuWfZ-im-zP3jUwdWN-pK61uogpgfPPAoVnejWfy2KafdF7LWlQ0CIwNNFufKf-A9bpcJRdXmtWsSMQicMirsodr0VTFwZidVjvWRtoDmEQkAoofaBX9pyyzI4mFjulEBaOobxAVeucM0AhmXMxQ6tR77xlFQfm9Jz_LTfr6yrEG8UtiWUCX5rOwcnZkxBavdsJFELDhGg0aHHfHITpisp",
    alt: "Red athletic running shoe on a plain background",
    rating: "4.6",
  },
  {
    id: 8,
    name: "Adidas Solar Glide",
    category: "Trail",
    price: 150,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcluEd2pA_7FfAqzjMydPHvhRYxD-Ay13EN8Ou9Hu1lrYM4yMykqM0g7Whk6iRgvTtDX5UsrC0foiffTtHdRGSTU7CV74GPFMtg2Jr4Kz7wK2m6Ay6gyy1IjN0Ybol9iu0YJM74myPcFvPayoxRc0BhzOl7fDHIqQVF6fI0lgicmnV4yLIHKvbYoFJymFa_knyWog-w2d_AfoMRVvod8XZTHtF_ji_Oc2__biwZUsv_lshRp5jJLYqZMJERGFZ4WPjQ6RWQiJ7JyPk",
    alt: "Green and white retro running shoe on a plain background",
    rating: "4.4",
  },
  {
    id: 9,
    name: "New Balance 1080v11",
    category: "Road",
    price: 155,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrSvJ8D7MxltYLYoRL2G7-pCIDk0UHj7z9u2TLMzsBTqVH632AhO3fGWFIRC2sRtXnx1Et7KfWPw_WhbLgDHAx_pwFc_61queazFMiP0E1rAzTfPzz3FoPnLR4vS-RI98t0-ZEXUcrZ1kpCFcKpay6PEKSsSoSwT-7fvStCMBVbwHhZj7PUMzluJ_owENyTu7itnsoPOGPGhi3jpxAwx5uAMzKui8fqgLKIpjHkIRK8jF8s_jy0Pv3-ChkowUC5gTjRyKWUoE7pBWU",
    alt: "High-top blue and white basketball shoe",
    rating: "4.7",
  },
  {
    id: 10,
    name: "Puma Fuse 2",
    category: "Training",
    price: 115,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI3eBnCVLgiFImClnAztz0IVOrTbwTVqEcK6vyn416-1Jkwl3mrU7fUY34oXzeKHhpdk5Xu5Sc10QsfNtVbJP-KXv0E9sXF5hwdzueMkrF_7tx_-qkA7uNkR_0EV-q0mFhFq-8BKusPpZMoQ8aeFF7FS28iSiTU-F6VhVRIttYWioFxsqpvWcVcBHwBeoyAXP29nWs3Zy25xtBIOcU9D-eHkYiwI4hVIjQ9Rvb9zMEfI_iJEEPUP1PKuOACHRcI7ccTa0T9-12fHTF",
    alt: "Futuristic white sneaker with colorful sole on purple background",
    rating: "4.3",
  },
  {
    id: 11,
    name: "Hoka Mach 4",
    category: "Cushion",
    price: 148,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9HRq2wRBNapJlqkcu19bZaunKtgId5ryo7OuddMfvs5lxmUHsSwBjdR9L-52JUmJcjuOrUDJEfJCVWC4py2NZW1mqfWyljPg5UdEzvwPgfNSmZOOELq5IMylMNhC4gMnTD2grNAY16YjyahW_dm5BMZrfNX-hmAFlaiiuU18CfrcC1quTdtgxOE92_V6s0O41lB8qikq1hbDz8TTPpVtLL_-SE69jEgyO5odREVnGUpchz_GwOYJuXqc0ayrVSxNOmaYijSg20rx9",
    alt: "Black mesh running shoe on dark background",
    rating: "4.6",
  },
  {
    id: 12,
    name: "Brooks Levitate 6",
    category: "Road",
    price: 142,
    badge: "HOT",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHeXfZrFCEXjUQIfYUfXDMw6vpf7OYjJepcpzJQGiwh_WG56bGYmc2l6PWQKI_yUIwxttWHWopK_I0j4XL7PZH6qkYC74TfI336xMetiM14t0xx_vuVmskGW9WWQ-Au7iwMtkdn7uWHTIM-8a_rpkyKcAH8PxhTzqipWkw_wCSJLqNOfgAbo2M_cmgNlac2Biv_eHi5w7m0WdCo3SXWUnL6D_NKrpvBcHHAAS5YdMA--yMreKL95pIR1Hyra1Ooj5u5Tr8jGIUB6ih",
    alt: "Pair of brown leather casual sneakers",
    rating: "4.9",
  },
  {
    id: 13,
    name: "Nike React Infinity",
    category: "Running",
    price: 135,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt3NRdPC4Ea281c8eFUXYf5M8kxa9bkQRX0PUsJ_gJI8q2iXBVztn4tdkuWfZ-im-zP3jUwdWN-pK61uogpgfPPAoVnejWfy2KafdF7LWlQ0CIwNNFufKf-A9bpcJRdXmtWsSMQicMirsodr0VTFwZidVjvWRtoDmEQkAoofaBX9pyyzI4mFjulEBaOobxAVeucM0AhmXMxQ6tR77xlFQfm9Jz_LTfr6yrEG8UtiWUCX5rOwcnZkxBavdsJFELDhGg0aHHfHITpisp",
    alt: "Red athletic running shoe on a plain background",
    rating: "4.5",
  },
  {
    id: 14,
    name: "Adidas Adizero Boston",
    category: "Trail",
    price: 148,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcluEd2pA_7FfAqzjMydPHvhRYxD-Ay13EN8Ou9Hu1lrYM4yMykqM0g7Whk6iRgvTtDX5UsrC0foiffTtHdRGSTU7CV74GPFMtg2Jr4Kz7wK2m6Ay6gyy1IjN0Ybol9iu0YJM74myPcFvPayoxRc0BhzOl7fDHIqQVF6fI0lgicmnV4yLIHKvbYoFJymFa_knyWog-w2d_AfoMRVvod8XZTHtF_ji_Oc2__biwZUsv_lshRp5jJLYqZMJERGFZ4WPjQ6RWQiJ7JyPk",
    alt: "Green and white retro running shoe on a plain background",
    rating: "4.6",
  },
  {
    id: 15,
    name: "New Balance 860v12",
    category: "Road",
    price: 158,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrSvJ8D7MxltYLYoRL2G7-pCIDk0UHj7z9u2TLMzsBTqVH632AhO3fGWFIRC2sRtXnx1Et7KfWPw_WhbLgDHAx_pwFc_61queazFMiP0E1rAzTfPzz3FoPnLR4vS-RI98t0-ZEXUcrZ1kpCFcKpay6PEKSsSoSwT-7fvStCMBVbwHhZj7PUMzluJ_owENyTu7itnsoPOGPGhi3jpxAwx5uAMzKui8fqgLKIpjHkIRK8jF8s_jy0Pv3-ChkowUC5gTjRyKWUoE7pBWU",
    alt: "High-top blue and white basketball shoe",
    rating: "4.7",
  },
];

const PRODUCTS_PER_PAGE = 12;

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);
  
  return (
    <div className="flex-1 w-full">
      {/* ------------- Top Bar ------------- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1b0d10] tracking-tight">
            Men's Running Shoes
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Showing {products.length} results
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 hidden sm:block">
            Sort by:
          </span>
          <div className="relative group">
            <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:border-[#ee2b4b] transition-colors shadow-sm">
              <span>Newest Arrivals</span>
              <span className="material-symbols-outlined text-lg"><MdOutlineExpandMore /></span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              <a className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#ee2b4b]" href="#">
                Price: Low to High
              </a>
              <a className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#ee2b4b]" href="#">
                Price: High to Low
              </a>
              <a className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#ee2b4b]" href="#">
                Popularity
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ------------- Grid ------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            category={product.category}
            price={`$${product.price.toFixed(2)}`}
            oldPrice={product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : undefined}
            rating={product.rating}
            imageUrl={product.image}
            badge={product.badge}
          />
        ))}
      </div>

      {/* ------------- Pagination ------------- */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

    </div>
  );
};

export default ProductGrid;