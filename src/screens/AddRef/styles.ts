import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    padding: 10,
    color: '#000',
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    color: '#000', 
  },

  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20,
    margin: 4,
  },

  tagActive: {
    backgroundColor: '#3f37c9',
  },

  tagText: {
     color: '#000',
  },

  tagTextActive: {
    color: '#fff',
  },

  button: {
    backgroundColor: '#3f37c9',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;