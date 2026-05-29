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
        justifyContent: 'space-between',
    },

    leftHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    clearText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    button: {
        backgroundColor: '#ee4343',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },

    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#eef2ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1f2937',
    },

    message: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
        lineHeight: 20,
    },

    time: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 8,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        marginTop: 12,
        fontSize: 16,
        color: '#9ca3af',
        fontWeight: '600',
    },
});