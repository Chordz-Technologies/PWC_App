import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },

    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 25,
        elevation: 8,
    },

    circleTop: {
        position: 'absolute',
        width: width * 1.2,
        height: width * 1.2,
        borderRadius: width,
        backgroundColor: 'rgba(255,255,255,0.08)',
        top: -width * 0.5,
        left: -width * 0.3,
    },

    circleBottom: {
        position: 'absolute',
        width: width,
        height: width,
        borderRadius: width,
        backgroundColor: 'rgba(255,255,255,0.06)',
        bottom: -width * 0.4,
        right: -width * 0.3,
    },

    logoWrapper: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#f1f3ff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 15,
    },

    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2b2d42',
    },

    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#8d99ae',
        marginBottom: 20,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#bababa',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    input: {
        flex: 1,
        padding: 12,
        color: '#2b2d42',
    },

    button: {
        backgroundColor: '#4361ee',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 15,
    },

    btnText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },

    signup: {
        textAlign: 'center',
        marginTop: 20,
        color: '#8d99ae',
    },

    signupLink: {
        color: '#4361ee',
        fontWeight: 'bold',
    },

    forgotButton: {
        alignSelf: 'flex-end',
        marginTop: -5,
        marginBottom: 16,
        paddingVertical: 5,
    },

    forgotText: {
        color: '#4361ee',
        fontSize: 13,
        fontWeight: '600',
    },

    modalOverlay: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    modalKeyboard: {
        flex: 1,
        width: '100%',
    },

    modalContentWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    modalCard: {
        width: '100%',
        maxHeight: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },

    modalHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 22,
    },

    modalTitle: {
        fontSize: 21,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 5,
    },

    modalSubtitle: {
        fontSize: 13,
        color: '#6b7280',
        maxWidth: 270,
        lineHeight: 18,
    },

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    fieldLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 7,
        marginTop: 4,
    },

    modalInputContainer: {
        minHeight: 52,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        marginBottom: 15,
    },

    modalInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#111827',
        paddingVertical: 12,
    },

    passwordInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eef2ff',
        borderRadius: 8,
        padding: 10,
        marginTop: 2,
        marginBottom: 18,
    },

    passwordInfoText: {
        flex: 1,
        marginLeft: 7,
        fontSize: 12,
        color: '#4b5563',
        lineHeight: 17,
    },

    resetButton: {
        height: 52,
        borderRadius: 10,
        backgroundColor: '#4361ee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    resetButtonDisabled: {
        opacity: 0.6,
    },

    resetButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },

    cancelButton: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    cancelButtonText: {
        color: '#6b7280',
        fontSize: 14,
        fontWeight: '600',
    },
});