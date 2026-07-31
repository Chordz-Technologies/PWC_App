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

    // searchBox: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     backgroundColor: '#fff',
    //     borderRadius: 10,
    //     paddingHorizontal: 10,
    //     marginBottom: 15,
    // },

    // searchInput: {
    //     flex: 1,
    //     padding: 10,
    // },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        elevation: 4,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
    },

    fees: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4361ee',
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    infoText: {
        marginLeft: 8,
        color: '#666',
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
    },

    addVisitorButton: {
        flex: 1,
        backgroundColor: '#4361ee',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 8,
    },

    enrollButton: {
        flex: 1,
        backgroundColor: '#10b981',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 6,
    },
});