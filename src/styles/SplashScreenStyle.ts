import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    /* 🔵 BACKGROUND CIRCLES */
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

    circleSmall: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255,0.05)',
        top: 90,
        right: 20,
    },

    /* 🔷 CONTENT */
    content: {
        alignItems: 'center',
        padding: 20,
    },

    iconWrapper: {
        width: 180,
        height: 180,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },

    logo: {
        width: 140,
        height: 140,
    },

    appName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffffff',
    },

    tagline: {
        fontSize: 16,
        color: '#e0e0e0',
        textAlign: 'center',
        marginVertical: 20,
        lineHeight: 20,
    },

    /* 🔷 BUTTON */
    button: {
        marginTop: 30,
        backgroundColor: '#ffffff',
        paddingVertical: 18,
        paddingHorizontal: 50,
        borderRadius: 30,
        elevation: 5,
    },

    btnText: {
        color: '#4361ee',
        fontWeight: '600',
        fontSize: 18,
    },
});
