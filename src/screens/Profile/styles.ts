import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },

  imageWrapper: {
    position: 'relative',
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },

  role: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
  },

  stats: {
    marginTop: 5,
    color: '#444',
  },

  bold: {
    fontWeight: '700',
  },

  desc: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },

  tagRow: {
    flexDirection: 'row',
    marginTop: 5,
  },

  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    fontSize: 12,
  },

  settingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },

  settingsText: {
    marginLeft: 5,
    fontSize: 14,
  },
});