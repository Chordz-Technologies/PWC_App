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

    storyCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        marginBottom: 18,
        overflow: 'hidden',
        elevation: 5,
    },

    storyImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },

    storyDate: {
        fontSize: 14,
        fontWeight: '700',
        color: '#4361ee',
        marginBottom: 8,
    },

    storyDesc: {
        fontSize: 15,
        color: '#444',
        lineHeight: 22,
    },

    fab: {
        position: 'absolute',
        bottom: 35,
        right: 25,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4361ee',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.5)',
        justifyContent: 'center',
        padding: 20,
    },

    modalCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    imagePicker: {
        alignItems: 'center',
        marginBottom: 20,
    },

    preview: {
        width: 120,
        height: 120,
        borderRadius: 12,
        marginBottom: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        height: 50,
        marginBottom: 10,
    },

    description: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        height: 120,
        textAlignVertical: 'top',
    },

    cancelBtn: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
    },

    submitBtn: {
        backgroundColor: '#4361ee',
        padding: 12,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
    },
});