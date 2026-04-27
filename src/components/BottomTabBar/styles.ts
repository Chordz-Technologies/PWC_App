import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: 65,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
  },

  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    fontSize: 11,
    marginTop: 4,
    color: '#777',
  },

  active: {
    color: '#4A6CF7',
    fontWeight: '600',
  },
});