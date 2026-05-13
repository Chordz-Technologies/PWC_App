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

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    formCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 18,
        elevation: 3,
    },

    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 15,
    },

    inputContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#eee',
    },

    input: {
        flex: 1,
        paddingVertical: 13,
        marginLeft: 10,
        color: '#000',
    },

    submitBtn: {
        backgroundColor: '#4361ee',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },

    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 15,
        color: '#222',
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        color: '#777',
    },

    clientCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 15,
        elevation: 2,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    clientAvatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#4361ee',
        justifyContent: 'center',
        alignItems: 'center',
    },

    clientAvatarText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    singleClientName: {
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },

    iconBtn: {
        marginLeft: 12,
    },
});