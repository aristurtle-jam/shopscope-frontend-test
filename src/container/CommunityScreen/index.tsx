import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAllUsers, selectAllUsers, selectError, selectIsLoading } from '../../ducks/users';
import { Text, Avatar, ActivityIndicator, Button } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';

const CommunityScreen = () => {
    const dispatch = useDispatch();
    const allUsers = useSelector(selectAllUsers);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(requestAllUsers());
            console.log('ALL USERS: ', allUsers);
        }, [])
    );

    const renderUserItem = ({ item }: { item: any }) => (
        <View style={styles.userCard}>
            <View style={styles.userInfo}>
                <Avatar.Text 
                    size={48} 
                    label={`${item.firstName[0]}${item.lastName[0]}`} 
                    style={styles.avatar} 
                />
                <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
            </View>
            <Button 
                mode="outlined" 
                style={styles.followButton} 
                labelStyle={styles.followButtonText}
            >
                Follow
            </Button>
        </View>
    );

    const renderContent = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
        }

        if (error) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error: {error}</Text>
                    <Button mode="contained" onPress={() => dispatch(requestAllUsers())}>
                        Retry
                    </Button>
                </View>
            );
        }

        if (allUsers.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No users found.</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={allUsers}
                keyExtractor={(item) => item._id}
                renderItem={renderUserItem}
                contentContainerStyle={styles.listContainer}
            />
        );
    };

    return <View style={styles.container}>{renderContent()}</View>;
};

export default CommunityScreen;
