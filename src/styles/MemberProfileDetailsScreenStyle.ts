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
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    profileCard: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 3,
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    defaultAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4361ee',
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarText: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
    },

    memberName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 12,
    },

    memberRole: {
        color: '#4361ee',
        marginTop: 5,
        fontWeight: '600',
    },

    referralRow: {
        flexDirection: 'row',
        marginTop: 20,
    },

    referralBox: {
        backgroundColor: '#f5f6fa',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
        marginHorizontal: 8,
        alignItems: 'center',
    },

    referralCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4361ee',
    },

    referralLabel: {
        marginTop: 4,
        color: '#555',
    },

    sectionCard: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 18,
        padding: 18,
        elevation: 2,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },

    infoRow: {
        flexDirection: 'row',
        marginBottom: 18,
    },

    iconBox: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: '#eef2ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    label: {
        fontSize: 13,
        color: '#888',
    },

    value: {
        fontSize: 15,
        color: '#000',
        fontWeight: '600',
        marginTop: 2,
    },
});