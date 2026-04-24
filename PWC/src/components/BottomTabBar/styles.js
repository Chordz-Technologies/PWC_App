import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 68,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    color: '#333',
    marginTop: 4,
  },
  activeLabel: {
    color: '#d8a517',
  },
});

export default styles;