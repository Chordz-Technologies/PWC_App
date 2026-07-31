import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 45,
        paddingBottom: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginBottom: 20,
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 30,
    },

    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 18,
        paddingVertical: 25,
        paddingHorizontal: 12,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 5,
    },

    iconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#eef3ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
        textAlign: 'center',
    },

    cardSubtitle: {
        fontSize: 13,
        color: '#777',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 20,
        lineHeight: 18,
    },

});