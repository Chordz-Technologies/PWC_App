import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  name: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  time: {
    fontSize: 11,
    color: '#c08d00',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default styles;