import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  content: {
    padding: 12,
    paddingBottom: 100,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },

  searchBox: {
    height: 44,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: '#111',
  },

  dropdownBox: {
    height: 44,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 16,
  },

  dropdownInput: {
    flex: 1,
    fontSize: 12,
    color: '#111',
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },

  categoryBtn: {
    backgroundColor: '#ddd',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginRight: 10,
    marginBottom: 10,
  },

  activeCategoryBtn: {
    backgroundColor: colors.primaryBlue1,
  },

  categoryText: {
    fontSize: 12,
    color: '#333',
  },

  activeCategoryText: {
    color: '#fff',
    fontWeight: '600',
  },

  descriptionInput: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingTop: 12,
    textAlignVertical: 'top',
    marginBottom: 16,
  },

  linkInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    marginBottom: 24,
  },

  buttonWrapper: {
    marginBottom: 20,
  },

  button: {
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;