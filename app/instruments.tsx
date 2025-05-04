import { get_instruments } from '@/api/get_instruments';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import InstrumentCard from '@/components/instrument_card';
import LoadingIndicator from '@/components/loading_indicator';
import Navbar from '@/components/navbar';
import { Instrument } from '@/types';

export default function instruments() {
    const [selectedCategory, setSelectedCategory] = useState('All Measurements');

    const { data: instrumentsData = [], isLoading, refetch, isFetching } = useQuery({
        queryKey: ['instruments'],
        queryFn: get_instruments,
    });

    const allCatsArray = useMemo(() => {
        const categories = new Set(['All Measurements']);
        instrumentsData.forEach((item: Instrument) => categories.add(item.category));
        return Array.from(categories).map((category) => ({ category }));
    }, [instrumentsData]);

    const filteredInstruments = useMemo(() => {
        if (selectedCategory === 'All Measurements') {
            return instrumentsData;
        }
        return instrumentsData.filter((item: Instrument) => item.category === selectedCategory);
    }, [selectedCategory, instrumentsData]);


    if (isLoading) return <LoadingIndicator />;

    return (
        <View style={styles.container}>
            <Navbar
                allCatsArray={allCatsArray}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <FlatList
                data={filteredInstruments}
                keyExtractor={(item: Instrument) => item._id}
                renderItem={InstrumentCard}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isFetching} onRefresh={refetch} colors={['#1C355E']} />
                }
            />
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
});
