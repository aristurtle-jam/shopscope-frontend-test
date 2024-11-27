import React, { useCallback, useState } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Platform, // Import Platform to handle platform-specific code
    FlatList,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import Images from '../../theme/Images';
import AddImageIcon from '../../assets/icons/add-image.svg';
import * as ImagePicker from 'react-native-image-picker';
import Cross from '../../assets/icons/image-cross.svg';
import { NavigationService } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { requestCreatePost, requestEditPost } from '../../ducks/posts';



const CreateBlogScreen = (props: any) => {
    const editPost = props.route?.params?.edit
    const postDetails = props.route?.params?.postDetails
    const userProfile = useSelector((state: any) => state.profile.myProfile)
    const dispatch = useDispatch()
    const [image, setImage] = useState(editPost ? postDetails.thumbNail : null);
    const [productImages, setProductImages] = useState(editPost ? postDetails.products.map((product: any) => product.image) : [])
    const [products, setProducts] = useState(editPost ? postDetails.products : [])

    // Function to handle image upload
    const onImageGalleryClick = useCallback((fromProductView?: boolean) => {
        const options: ImagePicker.ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: fromProductView ? 4 : 1,
            includeBase64: true,
        };

        ImagePicker.launchImageLibrary(options, (res: ImagePicker.ImagePickerResponse) => {
            if (res.didCancel) {
                console.log('User cancelled')
            } else if (res.errorCode) {
                console.log('ImagePickerError: ', res.errorMessage)
            } else {

                const uri = res.assets[0].uri
                const uris = res.assets.map(asset => asset.uri);


                if (fromProductView) {
                    setProductImages(prevImages => [...prevImages, ...uris]);
                }
                else {
                    setImage(uri)
                }
            }
        });
    }, [])

    const onPressAddProduct = () => {
        NavigationService.navigate('ProductListScreen', {
            onSelectProduct: handleSelectProduct
        });
    };

    const handleSelectProduct = (product: any) => {
        setProductImages((prevImages: any) => [...prevImages, product.productImage]);
        setProducts((prevProducts: any) => [...prevProducts, product]);
    };

    const onPressMainImageCross = () => {
        setImage(null)
    }

    const removeSmallImage = index => {
        setProductImages(prevImages => prevImages.filter((_, i) => i !== index));
        setProducts(prevProducts => prevProducts.filter((_, i) => i !== index));
    };

    const renderSmallImageItem = ({ item, index }) => {
        return (
            <View style={{ marginRight: 10, position: 'relative' }}>
                <Image source={{ uri: item }} style={{ width: 80, height: 80, borderRadius: 20 }} />
                <TouchableOpacity onPress={() => removeSmallImage(index)} style={{ position: 'absolute', top: 5, right: 5 }}>
                    <Cross width={20} height={20} />
                </TouchableOpacity>
            </View>
        );
    };

    const onPressPost = () => {
        const formData = new FormData();
        formData.append('thumbNail', { uri: image, type: 'image/jpeg', name: 'thumbnail.jpg' });
        products.forEach((product, index) => {
            formData.append(`products[${index}][id]`, product.productId.toString());
            formData.append(`products[${index}][image]`, product.productImage);
            formData.append(`products[${index}][variantId]`, product.productVariantId.toString());
            formData.append(`products[${index}][imageId]`, product.productImageId.toString());
        });
        dispatch(requestCreatePost(formData));
    }

    const onPressSave = () => {
        const formData = new FormData();
        formData.append('thumbNail', { uri: image, type: 'image/jpeg', name: 'thumbnail.jpg' });
        products.forEach((product, index) => {
            formData.append(`products[${index}][id]`, product.id ? product?.id.toString() : product.productId.toString());
            formData.append(`products[${index}][image]`, product.image ? product?.image : product.productImage);
            formData.append(`products[${index}][variantId]`, product?.variantId ? product?.variantId.toString() : product.productVariantId.toString());
            formData.append(`products[${index}][imageId]`, product?.imageId ? product?.imageId.toString() : product.productImageId.toString());
        });
        dispatch(requestEditPost({ formData: formData, id: postDetails._id }));
    }

    return (
        <View style={styles.container}>
            <AppHeader back={true} menu={false} rightComponent={false} share={false} setting={false} title={editPost ? 'Edit Post' : 'Create Post'} transparent={true} />
            <View style={styles.postView}>
                <View style={styles.profileView}>
                    {
                        userProfile.profile && (userProfile.profile.includes('https://') || userProfile.profile.includes('http://')) ?
                        <Image source={{ uri: userProfile.profile }} style={styles.profileImage} /> :
                            <View style={[styles.profileImage, { backgroundColor: 'black', justifyContent: 'center' }]}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>{userProfile.profile}</Text>
                            </View>
                    }
                    <Text style={styles.profileName}>{userProfile.firstName + " " + userProfile.lastName}</Text>
                </View>
                <View style={styles.uploadImageView}>
                    {/* TouchableOpacity to make the area clickable */}
                    <TouchableOpacity style={{ paddingVertical: 20 }} onPress={() => onImageGalleryClick(false)}>
                        {/* Display the selected image or the default icon */}
                        {image ? (
                            <>
                                <TouchableOpacity onPress={onPressMainImageCross} style={styles.crossIcon}>
                                    <Cross width={30} height={30} />
                                </TouchableOpacity>
                                <Image source={{ uri: image }} style={styles.postImage} />
                            </>
                        ) : (
                            <AddImageIcon width={180} height={180} />
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.productImageUploadView}>
                    <TouchableOpacity onPress={() => onPressAddProduct()}>
                        <AddImageIcon width={50} height={50} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.productImageView}>
                <FlatList
                    data={productImages}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderSmallImageItem}
                    contentContainerStyle={{ marginTop: 10 }}
                />

            </View>
            <TouchableOpacity onPress={editPost ? onPressSave : onPressPost} style={styles.bottomButton}>
                <Text style={styles.bottomButtonText}>{editPost ? 'SAVE' : 'POST NOW'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateBlogScreen;
