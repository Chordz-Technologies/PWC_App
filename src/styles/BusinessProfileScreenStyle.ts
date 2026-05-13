import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 15,
    },

    imageLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2b2d42',
        marginBottom: 8,
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

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

    scrollContainer: {
        padding: 15,
        paddingBottom: 40,
    },

    label: {
        marginTop: 15,
        marginBottom: 5,
        fontWeight: '600',
        color: '#2b2d42',
        fontSize: 14,
    },

    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#000',
        fontSize: 15,
    },

    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },

    imagePicker: {
        height: 140,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        marginTop: 8,
        overflow: 'hidden',
    },

    previewImage: {
        width: '100%',
        height: '100%',
    },

    uploadText: {
        marginTop: 5,
        color: '#4361ee',
        fontWeight: '600',
    },

    button: {
        backgroundColor: '#4361ee',
        padding: 15,
        borderRadius: 12,
        marginTop: 25,
        alignItems: 'center',
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});