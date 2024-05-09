import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User {
    picture: string;
    username: string;
    referral_count: number;
}

const fetchUserProfile = async (username: string) => {
    const response = await axios.get(`https://api.bags.fm/api/v1/user/${username}`);
    return response.data.response;
};

export const ProfileLookupScreen = () => {
    const [textInput, setTextInput] = useState('');
    const [search, setSearch] = useState('');

    const { data: profile, error, isLoading, refetch } = useQuery<User>({
        queryKey: ['profile', search],
        queryFn: () => fetchUserProfile(search),
        enabled: false,
    });

    const handleSearch = () => {
        setSearch(textInput);
    };

    useEffect(() => {
        if (search) refetch();
    }, [search]);

    const profileContent = isLoading ? (
        <Text>Loading...</Text>
    ) : error ? (
        <Text>User not found.</Text>
    ) : profile ? (
        <View style={styles.profile}>
            <Image source={{ uri: profile.picture }} style={styles.image} />
            <Text>Username: {profile.username}</Text>
            <Text>Rank: {profile.referral_count}</Text>
        </View>
    ) : null;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={textInput}
                onChangeText={setTextInput}
                placeholder="Enter username"
            />
            <Button title="Search" onPress={handleSearch} />
            {profileContent}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8 },
    profile: { marginTop: 16, alignItems: 'center' },
    image: { width: 80, height: 80, borderRadius: 40, marginBottom: 16 }
});
