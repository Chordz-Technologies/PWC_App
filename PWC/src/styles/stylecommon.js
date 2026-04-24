import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  info: {
    fontSize: 12,
    color: '#555',
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  box: {
    flexDirection: 'row',
    gap: 5,
  },
  section: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
});