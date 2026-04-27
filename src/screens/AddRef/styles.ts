import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#f4f1ea',
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
    marginTop: 20,
  },

  input: {
    height: 86,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 15,
    paddingHorizontal: 24,
    fontSize: 19,
    color: '#111',
  },

  noteInput: {
    height: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 15,
    paddingHorizontal: 24,
    paddingTop: 28,
    fontSize: 19,
    color: '#111',
    textAlignVertical: 'top',
  },

  button: {
    height: 50,
    backgroundColor: '#4A63F0',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
  },
});