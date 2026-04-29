import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  sub: {
    color: '#888',
    fontSize: 12,
  },

  desc: {
    fontSize: 13,
    color: '#444',
    marginVertical: 6,
  },

  tagRow: {
    flexDirection: 'row',
    marginVertical: 6,
  },

  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    fontSize: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  footerText: {
    fontSize: 12,
    color: '#555',
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3f37c9',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default styles;