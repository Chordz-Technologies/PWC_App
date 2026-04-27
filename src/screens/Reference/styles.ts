import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f1ea',
    padding: 26,
  },

  addButton: {
    height: 50,
    backgroundColor: '#4A63F0',
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    marginBottom: 36,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 24,
  },

  card: {
    minHeight: 128,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    marginBottom: 24,
    elevation: 4,
  },

  iconCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 22,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
  },

  role: {
    fontSize: 15,
    color: '#666',
    marginBottom: 10,
  },

  note: {
    fontSize: 15,
    color: '#666',
  },
});