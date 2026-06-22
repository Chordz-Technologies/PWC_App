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

    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        color: '#777',
        fontSize: 15,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },

    avatarIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#eef2ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },

    meetingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222',
    },

    memberName: {
        fontSize: 15,
        color: '#444',
        marginTop: 4,
    },

    meetingTime: {
        fontSize: 12,
        color: '#4361ee',
        marginTop: 4,
    },

    venue: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },

    cardContent: {
        flex: 1,
    },

    addVisitorButton: {
        marginTop: 15,
        backgroundColor: '#4361ee',
        height: 45,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    addVisitorText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },

});