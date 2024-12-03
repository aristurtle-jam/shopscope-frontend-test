import React from 'react'
import { View, StyleSheet, TouchableOpacity, useColorScheme, Text, Image } from 'react-native'
import styles from './styles';
import TrashIcon from '../../assets/icons/trash.svg';
import DiscountIcon from '../../assets/icons/discount.svg'
import Images from '../../theme/Images';
import WishlistItem from '../../container/WishlistScreen/interface';


interface ProductListCardProps {
    item: WishlistItem;
    isSelected: boolean;
	onPressDelete: any
}

const ProductListCard: React.FC<ProductListCardProps> = ({ item, isSelected, onPressDelete }) => {

	return (
		<View style={[styles.cardContainer, isSelected && styles.selectedContainer]}>
			<Image source={{uri: item.product.image.src}} resizeMode='cover' style={styles.imageContainer}/>
			<View style={styles.contentContainer}>
				<View style={styles.row}>
					<Text style={styles.titleText}>{item.product.title}</Text>
					<TouchableOpacity onPress={() => onPressDelete(item._id)}>
						<TrashIcon />
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<Text style={styles.priceText}>{`$ ${item.selectedVariantIdPrice}`}</Text>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Visit Store</Text>
					</TouchableOpacity>
				</View>
				{
				item.discountCode && 

				(
					<View style={styles.bottom}>
					<Text style={styles.priceText}>{item.discountCode}</Text>
					<Text style={styles.discountLabel}>Discount Code: </Text>
					<DiscountIcon/>
				</View>
				)
				}
				
			</View>
		</View>
	)
}

export default ProductListCard
