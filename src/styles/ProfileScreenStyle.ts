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
        margin: 15,
        padding: 20,
        alignItems: 'center',
    },

    avatarWrapper: {
        position: 'relative',
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#4361ee',
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },

    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        elevation: 2,
    },

    name: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    editProfileCard: {
        marginHorizontal: 15,
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },

    editProfileText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
});