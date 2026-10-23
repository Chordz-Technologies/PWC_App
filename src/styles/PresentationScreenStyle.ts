import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },

    container: {
        flex: 1,
        backgroundColor: '#f8f9fe',
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

    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerRight: {
        width: 40,
    },

    scrollContent: {
        padding: 15,
        paddingBottom: 30,
    },

    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 14,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },

    sectionHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#222',
        marginLeft: 9,
        flex: 1,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 7,
        marginTop: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#dfe3eb',
        borderRadius: 10,
        minHeight: 48,
        paddingHorizontal: 13,
        color: '#222',
        backgroundColor: '#fff',
    },

    commentInput: {
        minHeight: 90,
        paddingTop: 12,
    },

    submitButton: {
        marginTop: 20,
        backgroundColor: '#4361ee',
        borderRadius: 10,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    disabledButton: {
        opacity: 0.65,
    },

    submitButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },

    emptyText: {
        color: '#777',
        fontSize: 14,
        lineHeight: 21,
    },

    requestCard: {
        borderWidth: 1,
        borderColor: '#e6e9f0',
        borderRadius: 10,
        padding: 13,
        marginBottom: 10,
    },

    requestHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 8,
    },
    
    requestTopic: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#222',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 15,
        gap: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'capitalize',
    },
    detailText: {
        color: '#555',
        fontSize: 13,
        marginTop: 5,
    },
    statusMessage: {
        color: '#9a6700',
        fontSize: 13,
        marginTop: 10,
        lineHeight: 19,
    },
    rejectedMessage: {
        color: '#dc2626',
        fontSize: 13,
        marginTop: 10,
        lineHeight: 19,
    },
    approvedMessage: {
        color: '#16803c',
        fontSize: 13,
        marginTop: 10,
        lineHeight: 19,
    },
    approvedBanner: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#eaf7ee',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
    },
    approvedTitle: {
        fontSize: 16,
        color: '#166534',
        fontWeight: '700',
        marginBottom: 4,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 11,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e3e6ed',
        gap: 9,
    },
    notificationText: {
        flex: 1,
        fontSize: 14,
        color: '#444',
        lineHeight: 21,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    pickerButton: {
        minHeight: 50,
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 8,
        paddingHorizontal: 14,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },

    pickerText: {
        fontSize: 15,
        color: '#333333',
    },

    placeholderText: {
        color: '#999999',
    },

    dropdown: {
        height: 50,
        borderWidth: 1,
        borderColor: '#D6D6D6',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
    },

    dropdownList: {
        borderRadius: 8,
    },

    dropdownItemText: {
        fontSize: 15,
        color: '#333333',
    },
});