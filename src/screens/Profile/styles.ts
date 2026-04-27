import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f1ea',
    paddingHorizontal: 20,
    paddingTop: 36,
  },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 42,
    alignItems: 'center',
    elevation: 4,
  },

  avatarBox: {
    position: 'relative',
    marginBottom: 22,
  },

  editIcon: {
    position: 'absolute',
    right: -12,
    bottom: 8,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 18,
  },

  role: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 28,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },

  star: {
    fontSize: 17,
    marginRight: 8,
  },

  rating: {
    fontSize: 17,
    color: '#222',
  },

  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 28,
  },

  tagRow: {
    flexDirection: 'row',
    marginTop: 34,
    gap: 18,
  },

  tag: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
  },

  tagLarge: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
  },

  tagText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },

  settingBox: {
    height: 50,
    backgroundColor: '#f1f1f1',
    marginTop: 30,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
  },

  settingText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
    marginLeft: 18,
  },
});