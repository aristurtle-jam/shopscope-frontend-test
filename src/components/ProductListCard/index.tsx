import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';
import TrashIcon from '../../assets/icons/trash.svg';
import DiscountIcon from '../../assets/icons/discount.svg'
import Images from '../../theme/Images';
import WishlistItem from '../../container/WishlistScreen/interface';
import Colors from '../../theme/Colors';
import { useDispatch } from 'react-redux';
import { requestUpdateVariant } from '../../ducks/products';

interface ProductListCardProps {
	item: WishlistItem;
	count?: number;
	isSelected: boolean;
	onPressDelete: any;
	onPressAddToCart?: () => void;
	onIncrement?: () => void;
	onDecrement?: () => void;
	cart?: boolean,
	isInCart?: boolean
}

const ProductListCard: React.FC<ProductListCardProps> = ({ item, count, isSelected, onPressDelete, onPressAddToCart, onIncrement, onDecrement, cart, isInCart }) => {
	const addToCartText = isInCart ? "Added to Cart" : "Add to Cart";
	const buttonStyle = isInCart ? styles.greyButton : styles.button;
	const selectedVariant = item.product.variants.find((data: any) => data.id == item.selectedVariantId);

	const [value, setValue] = useState(selectedVariant ? selectedVariant.title : '');

	const data = item.product.variants;

	const dispatch = useDispatch();

	const handleChange = (variant: any) => {
		setValue(variant.title);
		dispatch(requestUpdateVariant({
			productId: item.productId,
			selectedVariantId: variant.id.toString()
		}));
	};

	const renderItem = (item: any) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>{item.title}</Text>
			</View>
		);
	};

	return (
		cart ?
			<View style={styles.cardContainer}>
				<Image source={{ uri: item.product.image.src }} resizeMode='cover' style={styles.imageContainer} />
				<View style={styles.contentContainer}>
					<View style={styles.row}>
						<Text style={styles.titleText}>{item.product.title}</Text>
						<View style={{ width: 80, flexDirection: 'row', position: 'absolute', right: -10, justifyContent: 'space-around' }}>
							<TouchableOpacity>
								<Text style={styles.counter} onPress={onDecrement}>-</Text>
							</TouchableOpacity>
							<View style={{ borderWidth: 1, padding: 2, paddingHorizontal: 5, backgroundColor: Colors.GREY, borderRadius: 5 }}>
								<Text style={styles.counter}>{count}</Text>
							</View>
							<TouchableOpacity>
								<Text style={styles.counter} onPress={onIncrement}>+</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.row}>
						<Text style={styles.priceText}>{`$ ${item.selectedVariantIdPrice}`}</Text>
					</View>
				</View>
				<TouchableOpacity onPress={() => onPressDelete(item)} style={[styles.buttonPosition, styles.removeButtonStyle]}>
					<Text style={styles.buttonText}>{"Remove"}</Text>
				</TouchableOpacity>
			</View> :
			<View style={styles.cardContainer}>
				<View>
					<Image source={{ uri: item.product.image.src }} resizeMode='cover' style={styles.imageContainer} />
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						iconStyle={styles.iconStyle}
						data={data}
						maxHeight={300}
						labelField="title"
						valueField="title"
						placeholder="Select item"
						value={value}
						onChange={(variant: any) => handleChange(variant)}
						renderItem={renderItem}
					/>
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.row}>
						<Text style={styles.titleText}>{item.product.title}</Text>
						<TouchableOpacity onPress={() => onPressDelete(item._id)}>
							<TrashIcon />
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<Text style={styles.priceText}>{`$ ${item.selectedVariantIdPrice}`}</Text>
						<TouchableOpacity onPress={() => onPressAddToCart ? onPressAddToCart() : () => {}} style={buttonStyle}>
							<Text style={styles.buttonText}>{addToCartText}</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.bottom}>
						<Text style={styles.priceText}>{item.discountCode}</Text>
						<Text style={styles.discountLabel}>Discount Code: </Text>
						<DiscountIcon />
					</View>
				</View>
			</View>
	)
}

export default ProductListCard
