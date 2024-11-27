import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Post } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetAllPosts } from '../../ducks/posts';
import { useFocusEffect } from '@react-navigation/native';

const PostsScreen = () => {
    const dispatch = useDispatch();
    const [isFetching, setIsFetching] = useState(false);
    const allPosts = useSelector((state: any) => state.posts.allPosts);
    console.log('TOTAL PAGES: ', allPosts.totalPages)
    const payload = {
        page: 1,
        limit: 5
    };

    const handleLoadMore = () => {
        console.log('HANDLE LOAD MORE RUNNING')
        if (!isFetching && allPosts.currentPage < allPosts.totalPages) {
            setIsFetching(true);
            dispatch(requestGetAllPosts({ ...payload, page: allPosts.currentPage + 1 }));
            setIsFetching(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            dispatch(requestGetAllPosts(payload));
        }, [])
    );

    const renderFooter = () => {
        if (!isFetching) return null;
        return <ActivityIndicator size="large" />;
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={allPosts.posts}
                keyExtractor={(item, index) => item._id + index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => <Post item={item.item} myProfile={false} detail={false} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                onRefresh={() => {
                    dispatch(requestGetAllPosts(payload));
                }}
                refreshing={isFetching}
            />
        </View>
    );
};

export default PostsScreen;
