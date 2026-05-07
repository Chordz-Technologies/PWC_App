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

    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },

    tabText: {
        fontSize: 16,
        color: '#999',
    },

    activeTab: {
        color: '#4361ee',
        fontWeight: 'bold',
    },

    underline: {
        height: 2,
        backgroundColor: '#4361ee',
        marginTop: 4,
    },

    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    searchInput: {
        flex: 1,
        padding: 10,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        elevation: 2,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    name: {
        fontWeight: 'bold',
        fontSize: 15,
    },

    date: {
        fontSize: 13,
    },

    location: {
        marginTop: 5,
    },

    label: {
        marginTop: 5,
    },

    labelBold: {
        fontWeight: 'bold',
    },

    type: {
        marginTop: 2,
    },

    convertBtn: {
        marginTop: 12,
        backgroundColor: '#4361ee',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    convertBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },

    modalCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    modalInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
    },

    cancelBtn: {
        backgroundColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },

    submitBtn: {
        backgroundColor: '#4361ee',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
});