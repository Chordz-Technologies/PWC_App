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

    certificate: {
        padding: 30,
        borderWidth: 4,
        borderColor: '#d4af37',
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginTop: 20,
    },

    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4361ee',
        textAlign: 'center',
    },

    subHeading: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },

    memberName: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textDecorationLine: 'underline',
    },

    description: {
        marginTop: 25,
        fontSize: 15,
        textAlign: 'center',
        color: '#444',
        lineHeight: 24,
    },

    footer: {
        marginTop: 40,
        fontSize: 18,
        fontWeight: '700',
        color: '#4361ee',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginHorizontal: 10,
    },

    downloadButton: {
        flex: 1,
        backgroundColor: '#4361ee',
        padding: 15,
        borderRadius: 12,
        marginRight: 8,
    },

    shareButton: {
        flex: 1,
        backgroundColor: '#10b981',
        padding: 15,
        borderRadius: 12,
        marginLeft: 8,
    },

    downloadText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});