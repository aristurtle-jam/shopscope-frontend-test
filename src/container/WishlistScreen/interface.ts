
interface WishlistItem {
    _id: number;
    productId: number
    product: {
        title: string;
        image: {
            src: string;
        };
        vendor: string;
    };
    selectedVariantIdPrice: number;
    discountCode?: string;
    tags: string;
}

export default WishlistItem;