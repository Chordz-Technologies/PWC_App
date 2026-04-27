import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 16,
    marginBottom: 18,
    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  image: {
    width: 130,
    height: 130,
    borderRadius: 14,
    resizeMode: 'cover',
    marginRight: 14,
  },

  infoBox: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  rowText: {
    marginLeft: 7,
    fontSize: 13,
    color: '#666',
    flex: 1,
    lineHeight: 18,
  },

  priceRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },

  priceBox: {
    flex: 1,
    backgroundColor: '#EEF3FF',
    borderRadius: 14,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  priceTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
  },

  priceSub: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },

  heading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
  },

  desc: {
    fontSize: 14,
    color: '#333',
    lineHeight: 21,
    marginBottom: 14,
  },

  rulesBox: {
    backgroundColor: '#EEF3FF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  rulesTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
  },

  ruleText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 21,
  },

  note: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
});