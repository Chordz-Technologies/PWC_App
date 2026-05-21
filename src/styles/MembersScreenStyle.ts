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

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingHorizontal: 15,
        marginBottom: 15,
        elevation: 2,
    },

    searchInput: {
        flex: 1,
        height: 50,
        marginLeft: 10,
        color: '#000',
    },

    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    tabButton: {
        flex: 1,
        backgroundColor: '#e9ecef',
        paddingVertical: 12,
        borderRadius: 12,
        marginHorizontal: 5,
        alignItems: 'center',
    },

    activeTabButton: {
        backgroundColor: '#4361ee',
    },

    tabText: {
        color: '#555',
        fontWeight: '600',
        fontSize: 14,
    },

    activeTabText: {
        color: '#fff',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
    },

    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
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

    avatar: {
        width: 55,
        height: 55,
        borderRadius: 28,
        backgroundColor: '#4361ee',
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },

    memberName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
    },

    businessCategory: {
        color: '#666',
        marginTop: 2,
    },

    infoText: {
        color: '#444',
        marginTop: 5,
        fontSize: 14,
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        color: '#666',
    },

    buttonContainer: {
        marginTop: 15,
    },

    viewButton: {
        borderWidth: 1,
        borderColor: '#1e1b8f',
        borderRadius: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

    viewButtonText: {
        color: '#1e1b8f',
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 14,
    },

    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    referenceButton: {
        flex: 1,
        backgroundColor: '#1e1b8f',
        paddingVertical: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 6,
    },

    meetingButton: {
        flex: 1,
        backgroundColor: '#14b8a6',
        paddingVertical: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 6,
    },

    bottomButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});