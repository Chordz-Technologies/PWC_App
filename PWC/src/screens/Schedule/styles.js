import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightBg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },

  body: {
    flex: 1,
    backgroundColor: colors.lightBg,
  },

  content: {
    padding: 12,
    paddingBottom: 90,
  },

  label: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 8,
  },

  searchBox: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.inputBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: colors.black,
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.inputBg,
    paddingHorizontal: 10,
    fontSize: 12,
    color: colors.black,
    marginBottom: 16,
  },

  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  iconLabelText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.black,
  },

  calendarCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
  },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  monthText: {
    fontSize: 14,
    color: colors.primaryBlue1,
    fontWeight: '600',
  },

  arrowRow: {
    flexDirection: 'row',
  },

  arrowBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  weekDay: {
    width: 28,
    textAlign: 'center',
    fontSize: 12,
    color: colors.primaryBlue1,
    fontWeight: '500',
  },

  dayCell: {
    width: 28,
    alignItems: 'center',
  },

  dayText: {
    fontSize: 12,
    color: '#333',
  },

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  timeBtn: {
    width: '31%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  activeTimeBtn: {
    backgroundColor: colors.primaryBlue1,
    borderColor: colors.primaryBlue1,
  },

  timeText: {
    fontSize: 12,
    color: colors.black,
  },

  activeTimeText: {
    color: colors.white,
    fontWeight: '600',
  },

  notesInput: {
    height: 90,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingTop: 12,
    textAlignVertical: 'top',
    marginBottom: 20,
  },

  confirmBtnWrapper: {
    marginBottom: 24,
  },

  confirmBtn: {
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});

export default styles;