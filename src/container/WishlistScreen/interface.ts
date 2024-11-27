
interface WishlistItem {
    _id: number;
    image: any; // You can specify the type of the image (e.g., string for image URI or any other appropriate type)
    productTitle: string;
    price: number;
    discountCode: string;
}

export default WishlistItem;