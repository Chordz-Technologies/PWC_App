import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 100,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
  },

  filterText: {
    fontSize: 12,
    color: '#333',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginTop: 12,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 12,
    color: '#666',
  },

  description: {
    fontSize: 12,
    color: '#444',
    marginVertical: 8,
  },

  tagRow: {
    flexDirection: 'row',
  },

  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    fontSize: 11,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },

  recommendText: {
    fontSize: 11,
    color: '#777',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    fontSize: 11,
    marginHorizontal: 4,
  },

  fab: {
    position: 'absolute',
    right: 26,
    bottom: 90,
    width: 70,
    height: 60,
    borderRadius: 29,
    backgroundColor: colors.primaryBlue1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex:999,
  },
});