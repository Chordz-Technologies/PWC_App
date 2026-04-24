import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },

  headerCenter: {
    flex: 1,
    marginLeft: 10,
  },

  greeting: {
    fontSize: 10,
    color: '#fff',
    marginBottom: 2,
  },

  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  scrollContent: {
    padding: 10,
    paddingBottom: 20,
  },

  posterWrapper: {
    marginBottom: 8,
  },

  poster: {
    height: 520,
    resizeMode: 'cover',
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccd3ea',
    marginHorizontal: 4,
  },

  activeDot: {
    width: 20,
    backgroundColor: colors.primaryBlue1,
  },

  exploreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  cardWidth: {
    width: '47.5%',
  },

  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  meetingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },

  viewAll: {
    fontSize: 12,
    color: colors.primaryBlue1,
    fontWeight: '600',
  },
});

export default styles;