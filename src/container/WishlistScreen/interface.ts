
interface WishlistItem {
    _id: number;
    image: any; // You can specify the type of the image (e.g., string for image URI or any other appropriate type)
    productTitle: string;
    price: number;
    discountCode: string;
    productId: number
    product: {
        variants: [{
            title: string
        }],
        image: {
            src: string
        }
        title: string
    },
    selectedVariantId: number,
    selectedVariantIdPrice: number
}

export default WishlistItem;