import { MdOutlineDeleteOutline } from "react-icons/md";

type CartItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    size: string;
    color: string;
    image: string;
};

const items: CartItem[] = [
    {
        id: 1,
        name: "Urban Trekker Low",
        category: "Men's Running Shoe",
        price: 120,
        size: "10",
        color: "Grey",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAq9OXD6c-16MG8_MrQwWygSdWLPjNwsk1r8kbz_ggrS_AOpQgI6I-fC_Q8yiBjxOPcICG_Jcz2TYE4AHr7GzLZIgVR-aP04pt9C8-f4aElFBHx8y4YotmyWFfUVDyXMG9_3_BNyn_BndEzLr4huI9UiqorMVJMSOmQe--7IGP_Y1vt0x0GAE6nf50R71pfmeW5_Hb8zILXYoAvvRvyhQGvSAUVndB98MEXstuSi1Io6ILhqObcDtmHS_MOMv8NHUcneC5VijBuUBhz",
    },
    {
        id: 2,
        name: "Speed Runner Pro",
        category: "Basketball Sneaker",
        price: 145,
        size: "9.5",
        color: "Red",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDWMS3ZqlSHblgEuSBl3H9KrESpT45jiSsQqEz9Ze9KRzDTS6_-lZ9R4lCY3W4D408RHuqvwJVSiQVMwCTzuqUYub1KXrK1ZJpqPDa_YYXiEir-Q3qxY7biH9j2DxJ73sTTKHHOFHdy3Wtc8Z3RPYaXCm_WeQeFISZcpJWDw2E_7q-3sNYBcQ7enMV4evbL5BhYRTh-1muqmNPNpZvHtBqhnPqvTWjt0_IlyPSbP702UReH4BZoCicxpPPoLkqOzo8DVBZeu9oOLChJ",
    },
    {
        id: 3,
        name: "Air Pulse 90",
        category: "Casual Sneaker",
        price: 160,
        size: "11",
        color: "Mustard",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDAk78r_VH9KmyTZ5k6Kri-zxpTb3ITYmX5C6f8dN26fJHIc6zSUU7_aniKs6-inddn0UOJLaPLczD4ysP81KHvByuAcXAoY3Q5TcctF6LRU9JhcTM2QBLakAcTp27xwE_ni9FTR39P_cgO_ntQ8qSuxYZSZiaLVOcpZAUpIVbnlPh77MdvAtgkSbX38y_4RIYcvLSxr4T4tGNo4z9DIIusqujCgwUuy0HAILTyu3_qxuTCFt9UMTk-8Z1OknI1I1v_9Ii4TOjMB5Lr",
    },
    {
        id: 4,
        name: "Air Pulse 90",
        category: "Casual Sneaker",
        price: 160,
        size: "11",
        color: "Mustard",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDAk78r_VH9KmyTZ5k6Kri-zxpTb3ITYmX5C6f8dN26fJHIc6zSUU7_aniKs6-inddn0UOJLaPLczD4ysP81KHvByuAcXAoY3Q5TcctF6LRU9JhcTM2QBLakAcTp27xwE_ni9FTR39P_cgO_ntQ8qSuxYZSZiaLVOcpZAUpIVbnlPh77MdvAtgkSbX38y_4RIYcvLSxr4T4tGNo4z9DIIusqujCgwUuy0HAILTyu3_qxuTCFt9UMTk-8Z1OknI1I1v_9Ii4TOjMB5Lr",
    },
    {
        id: 5,
        name: "Air Pulse 90",
        category: "Casual Sneaker",
        price: 160,
        size: "11",
        color: "Mustard",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDAk78r_VH9KmyTZ5k6Kri-zxpTb3ITYmX5C6f8dN26fJHIc6zSUU7_aniKs6-inddn0UOJLaPLczD4ysP81KHvByuAcXAoY3Q5TcctF6LRU9JhcTM2QBLakAcTp27xwE_ni9FTR39P_cgO_ntQ8qSuxYZSZiaLVOcpZAUpIVbnlPh77MdvAtgkSbX38y_4RIYcvLSxr4T4tGNo4z9DIIusqujCgwUuy0HAILTyu3_qxuTCFt9UMTk-8Z1OknI1I1v_9Ii4TOjMB5Lr",
    },
];

const CartItems = () => {
    return (
        <>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:border-[#ee2b4b]/20 transition"
                >
                    <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-neutral-50">
                        <div
                            className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-500"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p className="text-sm text-neutral-500">{item.category}</p>

                                <div className="flex gap-3 mt-3">
                                    <span className="px-2.5 py-0.5 text-xs bg-neutral-100 rounded-md">
                                        Size: {item.size}
                                    </span>
                                    <span className="px-2.5 py-0.5 text-xs bg-neutral-100 rounded-md">
                                        Color: {item.color}
                                    </span>
                                </div>
                            </div>

                            <p className="text-lg font-bold">Rs {item.price}.00</p>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                            <div className="flex items-center border rounded-lg border-neutral-100">
                                <button className="w-8 h-8 cursor-pointer">−</button>
                                <input
                                    readOnly
                                    value={1}
                                    className="w-10 h-8 text-center text-sm"
                                />
                                <button className="w-8 h-8 cursor-pointer">+</button>
                            </div>

                            <button className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-red-500 transition-colors">
                                <span className="material-symbols-outlined text-[20px]"><MdOutlineDeleteOutline /></span>
                                <span className="hidden sm:inline">Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CartItems;