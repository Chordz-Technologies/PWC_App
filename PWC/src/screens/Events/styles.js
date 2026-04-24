import { StyleSheet,StatusBar} from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 140,
  },
   header: {
      backgroundColor: '#0B6EDC',
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
      paddingBottom: 18,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  eventImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    resizeMode: 'cover',
    marginBottom: 12,
  },

  badge: {
    backgroundColor: '#dbeafe',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 10,
  },

  badgeText: {
    color: colors.primaryBlue1,
    fontSize: 12,
    fontWeight: '500',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  rowText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#333',
    flex: 1,
  },

  entryInfo: {
    fontSize: 13,
    color: '#111',
    marginTop: 6,
    marginBottom: 16,
    fontWeight: '500',
  },

  buttonWrapper: {
    marginTop: 4,
  },

  button: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  posterCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  posterImage: {
    width: '100%',
    height: 170,
    borderRadius: 16,
    resizeMode: 'cover',
    marginBottom: 12,
  },
});

export default styles;