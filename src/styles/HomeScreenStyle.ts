import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },

    /* HEADER */
    header: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },

    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    welcomeText: {
        color: '#e0e0e0',
        fontSize: 14,
    },

    username: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 2,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    greeting: {
        color: '#fff',
        marginTop: 10,
        fontSize: 14,
    },

    /* SWIPER */
    swiperContainer: {
        height: 220,
        marginTop: 15,
    },

    bannerWrapper: {
        width: width * 0.92,
        alignSelf: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },

    bannerImage: {
        width: '100%',
        height: 200,
    },

    /* SECTION */
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 15,
        marginTop: 15,
    },

    /* CARDS */
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 10,
    },

    card: {
        width: width * 0.44,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#eef2ff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardTitle: {
        fontWeight: 'bold',
        marginTop: 10,
    },

    cardSub: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        alignItems: 'center',
    },

    viewAll: {
        color: '#4361ee',
        fontWeight: '500',
        paddingHorizontal: 15,
        marginTop: 15,
    },

    meetingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 15,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    avatarIcon: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#eef1ff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    meetingTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2b2d42',
    },

    meetingName: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    },

    meetingTime: {
        fontSize: 12,
        color: '#4361ee',
        marginTop: 4,
    },
});
