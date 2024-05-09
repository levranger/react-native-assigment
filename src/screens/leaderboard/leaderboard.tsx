import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from "../../../contracts/user/user.interface";

const fetchLeaderboard = async () => {
    const response = await axios.get('https://api.bags.fm/api/v1/user/get_user_leaderboard');
    return response.data.response;
};

export const LeaderboardScreen = () => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['leaderboard'],
        queryFn: fetchLeaderboard,
    });

    const renderItem = ({ item }: { item: User }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.picture }} style={styles.image} />
            <Text>{item.points}. {item.username}</Text>
        </View>
    );

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching data.</Text>;

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    item: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    image: { width: 40, height: 40, borderRadius: 20, marginRight: 16 }
});
