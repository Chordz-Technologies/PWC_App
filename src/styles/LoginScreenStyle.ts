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

    forgot: {
        textAlign: 'right',
        color: '#4361ee',
        marginBottom: 20,
        fontSize: 13,
    },

    button: {
        backgroundColor: '#4361ee',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
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
});
