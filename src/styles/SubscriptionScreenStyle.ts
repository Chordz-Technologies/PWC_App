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

    subscriptionCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        marginBottom: 20,
        padding: 18,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    planHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    planIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4361ee',
        justifyContent: 'center',
        alignItems: 'center',
    },

    planName: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#2b2d42',
    },

    duration: {
        fontSize: 13,
        color: '#8d99ae',
        marginTop: 3,
    },

    priceContainer: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'baseline',
    },

    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4361ee',
    },

    perPlan: {
        fontSize: 13,
        color: '#8d99ae',
        marginLeft: 6,
    },

    benefitTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2b2d42',
        marginTop: 20,
        marginBottom: 10,
    },

    benefitRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 9,
    },

    benefitText: {
        flex: 1,
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginLeft: 8,
    },

    subscribeButton: {
        height: 50,
        borderRadius: 12,
        backgroundColor: '#4361ee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
    },

    subscribeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#888',
        fontSize: 15,
    },

    paymentOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    paymentLoaderCard: {
        width: '75%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
    },

    paymentLoaderText: {
        marginTop: 15,
        color: '#2b2d42',
        fontSize: 15,
        fontWeight: '600',
    },
});