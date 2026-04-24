import { StyleSheet, StatusBar, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1EB',
  },

  header: {
    backgroundColor: '#0B6EDC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 12,
    fontWeight: '600',
  },

  content: {
    padding: 14,
    paddingBottom: 120,
  },

  button: {
    backgroundColor: '#0B6EDC',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 30,
  },

  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});