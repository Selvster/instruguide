import { get_instrument } from '@/api/get_instrument';
import LoadingIndicator from '@/components/loading_indicator';
import Navbar from '@/components/navbar';
import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Instrument() {
    const { id } = useLocalSearchParams<{ id: string }>();

    if (!id) {
        router.replace('/instruments');
        return null;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['instrument', id],
        queryFn: () => get_instrument(id),
    });

    if (isLoading) return <LoadingIndicator />;

    const handleOpenVideo = () => {
        if (data?.video) {
            Linking.openURL(data.video);
        }
    };

    return (
        <View style={styles.container}>
            <Navbar showPicker={false} />
            <Image source={{ uri: data.image }} style={styles.image} />

            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.category}>{data.category}</Text>
            <Text style={styles.description}>{data.description}</Text>
            {data.video && (
                <TouchableOpacity style={styles.button} onPress={handleOpenVideo}>
                    <FontAwesome name="video-camera" size={18} color="#fff" />
                    <Text style={styles.buttonText}>View Video</Text>
                </TouchableOpacity>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F8FB',
        padding: 16,
        paddingTop: 60,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        resizeMode: 'contain',
        marginBottom: 20,
        backgroundColor: '#D6EFFF',
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 22,
        color: '#1C355E',
        marginBottom: 8,
    },
    category: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#4FA0CA',
        marginBottom: 12,
    },
    description: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: '#1C355E',
        marginBottom: 24,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#4FA0CA',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        marginLeft: 8,
    },
});
