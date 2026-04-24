import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2F79D8',
  },

  container: {
    flex: 1,
    backgroundColor: '#F4F1EB',
    paddingTop: 22,
  },

  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },

  headerRightSpace: {
    width: 24,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 22,
    borderRadius: 22,
    paddingVertical: 26,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  imageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  editIcon: {
    position: 'absolute',
    right: -4,
    bottom: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },

  role: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },

  rating: {
    fontSize: 14,
    color: '#222',
    marginTop: 12,
    marginBottom: 16,
  },

  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
    paddingHorizontal: 8,
  },

  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  tag: {
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    marginHorizontal: 6,
    marginTop: 6,
  },

  tagText: {
    fontSize: 13,
    color: '#222',
    fontWeight: '500',
  },

  settings: {
    backgroundColor: '#EFEFEF',
    marginHorizontal: 22,
    marginTop: 18,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingsText: {
    fontSize: 15,
    color: '#222',
    marginLeft: 10,
    fontWeight: '500',
  },
});