import { Instrument } from "@/types";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InstrumentCard({ item }: { item: Instrument }) {

    const cropDescription = (description: string) => {
        const maxLength = 100; // Set the maximum length for the description
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...'; // Add ellipsis if cropped
        }
        return description;
    }


    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.card} key={item._id} onPress={() => {
            router.push({
                pathname: '/instrument',
                params: { id: item._id },
            })
         }}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.description}>{cropDescription(item.description)}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#F3F8FB',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#1C355E',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 'auto',
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#D6EFFF',
        padding: 20,
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#1C355E',
        marginBottom: 4,
    },
    category: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#4FA0CA',
        marginBottom: 6,
    },
    description: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: '#4FA0CA',
    },
})