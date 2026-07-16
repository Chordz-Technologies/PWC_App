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

    videoCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        elevation: 4
    },

    fab: {
        position: 'absolute',
        bottom: 45,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4361ee',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});