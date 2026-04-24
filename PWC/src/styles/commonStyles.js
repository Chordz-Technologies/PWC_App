import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  eventTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  eventImage: {
    width: 125,
    height: 125,
    borderRadius: 14,
    marginRight: 12,
  },

  eventDetails: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  infoText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 6,
    flex: 1,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 14,
    gap: 10,
  },

  priceBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF3FF',
    padding: 12,
    borderRadius: 12,
  },

  priceTextWrap: {
    marginLeft: 8,
  },

  priceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1E1E',
  },

  priceSub: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },

  descText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },

  rulesBox: {
    backgroundColor: '#EAF3FF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  rulesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },

  ruleText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    marginBottom: 2,
  },

  noteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
  },

  formHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 6,
    marginTop: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#AFAFAF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 8,
    backgroundColor: '#FFF',
  },

  paymentOption: {
    borderWidth: 1,
    borderColor: '#AFAFAF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  paymentOptionText: {
    fontSize: 15,
    color: '#1E1E1E',
    fontWeight: '500',
  },

  radioCircle: {
    fontSize: 18,
    color: '#0B6EDC',
  },

  divider: {
    height: 1,
    backgroundColor: '#D8D8D8',
    marginVertical: 12,
  },

  expiryCvvRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  halfBox: {
    flex: 1,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 15,
    color: '#1E1E1E',
  },

  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E1E1E',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#F4F1EB',
  },

  header: {
    backgroundColor: '#0B6EDC',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: '#F4F1EB',
  },
});