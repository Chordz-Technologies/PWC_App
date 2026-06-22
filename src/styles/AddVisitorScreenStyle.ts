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

    label: {
        marginTop: 15,
        marginBottom: 5,
        fontWeight: '600',
    },

    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#000',
    },

    button: {
        backgroundColor: '#4361ee',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});