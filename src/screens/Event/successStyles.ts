import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1EB',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },

  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#0878d8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#dceeff',
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 14,
    padding: 16,
    elevation: 3,
  },

  eventTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },

  info: {
    fontSize: 13,
    marginBottom: 6,
    color: '#333',
  },

  nextBox: {
    backgroundColor: '#e6f2ff',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },

  nextTitle: {
    fontWeight: '700',
    marginBottom: 6,
  },

  nextText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  smallBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingVertical: 9,
    alignItems: 'center',
  },

  primaryBtn: {
    backgroundColor: '#0878d8',
    width: '100%',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginTop: 18,
  },

  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },

  secondaryBtn: {
    width: '100%',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },

  secondaryText: {
    color: '#111',
  },
});