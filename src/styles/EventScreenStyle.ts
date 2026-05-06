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

    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    eventCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 30,
        marginBottom: 20,
        elevation: 3,
    },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#eef1ff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: 10,
    },

    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },

    eventText: {
        marginLeft: 8,
        color: '#555',
        flex: 1,
    },

    entryText: {
        marginTop: 10,
        color: '#000',
        fontWeight: '500',
    },

    button: {
        backgroundColor: '#4361ee',
        marginTop: 15,
        padding: 12,
        borderRadius: 25,
        alignItems: 'center',
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
