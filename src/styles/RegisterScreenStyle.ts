import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 6,
        flex: 1,              // 🔥 important
        marginVertical: 20,
    },
    dateText: {
        marginLeft: 10,
        color: '#333',
        fontSize: 14,
    },


    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 25,
        color: '#2b2d42',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#bababa',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 12,
    },

    input: {
        flex: 1,
        padding: 12,
        color: '#000',
    },

    dropdown: {
        borderWidth: 1,
        borderColor: '#bababa',
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
    },

    button: {
        backgroundColor: '#4361ee',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },

    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },

    link: {
        textAlign: 'center',
        marginTop: 20,
        color: '#8d99ae',
    },

    linkHighlight: {
        color: '#4361ee',
        fontWeight: 'bold',
    },
});
