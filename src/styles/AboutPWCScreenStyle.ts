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
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },

    logoCircle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },

    appTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2b2d42',
        marginTop: 15,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
        elevation: 3,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
        color: '#2b2d42',
    },

    description: {
        color: '#555',
        lineHeight: 24,
        fontSize: 15,
    },

    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },

    featureText: {
        marginLeft: 12,
        color: '#444',
        fontSize: 15,
    },
});