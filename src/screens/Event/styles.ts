import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    marginBottom: 18,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },

  eventImage: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    resizeMode: 'cover',
    marginBottom: 12,
  },

  badge: {
    backgroundColor: '#E9EEFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 14,
  },

  badgeText: {
    color: '#4361ee',
    fontSize: 13,
    fontWeight: '700',
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  rowText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },

  entryInfo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginTop: 6,
    marginBottom: 16,
  },

  buttonWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
  },

  button: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});