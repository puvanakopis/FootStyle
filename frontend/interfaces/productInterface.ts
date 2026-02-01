export interface Size {
    size: string;
    stock: number;
}

export interface Review {
    user: string;
    rating: number;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Product {
    id: string;
    _id?: string;
    title?: string;
    name: string;
    gender: 'Men' | 'Women' | 'Kids';
    material: 'Mesh' | 'Leather' | 'Synthetic' | 'Other';
    description?: string;
    price: number;
    images: string[];
    sizes: Size[];
    reviews: Review[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    rating?: number;
}

export interface CreateProductRequest {
    title?: string;
    name: string;
    gender: 'Men' | 'Women' | 'Kids';
    material: 'Mesh' | 'Leather' | 'Synthetic' | 'Other';
    description?: string;
    price: number;
    sizes?: Size[];
    isActive?: boolean;
}

export interface UpdateProductRequest {
    title?: string;
    name?: string;
    gender?: 'Men' | 'Women' | 'Kids';
    material?: 'Mesh' | 'Leather' | 'Synthetic' | 'Other';
    description?: string;
    price?: number;
    sizes?: Size[];
    isActive?: boolean;
}

export interface AddReviewRequest {
    rating: number;
    comment: string;
}

export interface ProductsResponse {
    success: boolean;
    count?: number;
    data: Product[];
    message?: string;
}

export interface ProductResponse {
    success: boolean;
    data: Product;
    message?: string;
}

export interface ProductState {
    products: Product[];
    currentProduct: Product | null;
    isLoading: boolean;
    error: string | null;}

export interface ProductContextType extends ProductState {
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: string) => Promise<void>;
    createProduct: (data: CreateProductRequest, images: File[]) => Promise<void>;
    updateProduct: (id: string, data: UpdateProductRequest, images?: File[]) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    addReview: (productId: string, review: AddReviewRequest) => Promise<void>;
    clearCurrentProduct: () => void;
}