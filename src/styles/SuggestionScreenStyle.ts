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

    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        color: '#1f2937',
    },

    subTitle: {
        marginTop: 10,
        textAlign: 'center',
        color: '#6b7280',
        lineHeight: 22,
        fontSize: 14,
    },

    input: {
        marginTop: 25,
        borderWidth: 1,
        borderColor: '#dbe2ea',
        borderRadius: 15,
        minHeight: 180,
        padding: 15,
        fontSize: 15,
        color: '#000',
    },

    button: {
        marginTop: 20,
        height: 55,
        borderRadius: 15,
        backgroundColor: '#4361ee',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 8,
    },
});