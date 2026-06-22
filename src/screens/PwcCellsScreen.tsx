import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/PwcCellsScreenStyle';

const PWCCellsScreen = ({ navigation }: any) => {

    const cells = [
        {
            id: 1,
            name: 'Event Cell',
            icon: 'calendar-outline',
        },
        {
            id: 2,
            name: 'Kalarang Cell',
            icon: 'color-palette-outline',
        },
        {
            id: 3,
            name: 'Real Estate Cell',
            icon: 'business-outline',
        },
        {
            id: 4,
            name: 'Education Cell',
            icon: 'school-outline',
        },
        {
            id: 5,
            name: 'Healthcare Cell',
            icon: 'medkit-outline',
        },
        {
            id: 6,
            name: 'Women Entrepreneurship Cell',
            icon: 'people-outline',
        },
        {
            id: 7,
            name: 'Technology Cell',
            icon: 'laptop-outline',
        },
        {
            id: 8,
            name: 'Social Service Cell',
            icon: 'heart-outline',
        },
    ];

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* HEADER */}
                <LinearGradient
                    colors={['#4361ee', '#3f37c9']}
                    style={styles.header}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Icon
                            name="arrow-back"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        PWC Cells
                    </Text>

                    <View style={{ width: 24 }} />
                </LinearGradient>

                <ScrollView
                    contentContainerStyle={{
                        padding: 15,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {cells.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            activeOpacity={0.8}
                            onPress={() => {
                                // Navigate to details screen if needed
                                // navigation.navigate('CellDetails', { cell: item });
                            }}
                        >
                            <View style={styles.leftSection}>
                                <View style={styles.iconContainer}>
                                    <Icon
                                        name={item.icon}
                                        size={28}
                                        color="#4361ee"
                                    />
                                </View>

                                <Text style={styles.cellName}>
                                    {item.name}
                                </Text>
                            </View>

                            {/* <Icon
                                name="chevron-forward"
                                size={22}
                                color="#999"
                            /> */}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
        </SafeAreaWrapper>
    );
};

export default PWCCellsScreen;