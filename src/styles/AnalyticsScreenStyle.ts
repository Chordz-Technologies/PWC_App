import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },

    tabText: {
        fontSize: 16,
        color: '#999',
    },

    activeTab: {
        color: '#4361ee',
        fontWeight: 'bold',
    },

    underline: {
        height: 2,
        backgroundColor: '#4361ee',
        marginTop: 4,
    },

    card: {
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
    },

    iconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardTitle: {
        fontSize: 14,
        color: '#444',
        marginBottom: 5,
    },

    cardValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
});