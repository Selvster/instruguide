
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface category {
    category: string;
}
export default function Navbar({
    selectedCategory,
    setSelectedCategory,
    allCatsArray,
    showPicker = true,
}: {
    selectedCategory?: string;
    setSelectedCategory?: (category: string) => void;
    allCatsArray?: { category: string }[];
    showPicker?: boolean;
}) {
    return (<View style={styles.navbar}>
        <Image source={require('../assets/images/logo_cropped.png')} style={styles.logo} />

        {
            showPicker ? (
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.dropdown}
                    onValueChange={(itemValue) => setSelectedCategory && setSelectedCategory(itemValue)}
                >
                    {allCatsArray?.map((item: category, index: number) => (
                        <Picker.Item key={index} label={item.category} value={item.category} />
                    ))}
                </Picker>
            ) : (
                <TouchableOpacity style={styles.button} onPress={() => router.push('/instruments')}>
                    <FontAwesome name="thermometer" size={18} color="#fff" />
                    <Text style={styles.buttonText}>
                        All Instruments
                    </Text>
                </TouchableOpacity>
            )
        }

    </View>)

}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Space out the logo and the dropdown
        marginBottom: 20,
    },
    logo: {
        width: 100, // Adjust the w_idth to fit the image properly
        height: 80, // Adjust the height accordingly to maintain aspect ratio
        resizeMode: 'contain', // Ensure the logo doesn't stretch
    },
    dropdown: {
        height: 'auto',
        width: 240,
        borderColor: '#D6EFFF',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#D6EFFF',
        color: '#1C355E',
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
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
})