import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 22,
  },

  forgotContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 16,
  },

  forgotText: {
    color: colors.primaryBlue1,
    fontSize: 13,
    fontWeight: '600',
  },

  buttonWrapper: {
    width: '100%',
    marginBottom: 20,
  },

  button: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: '700',
  },

  footer: {
    flexDirection: 'row',
  },

  footerText: {
    fontSize: 12,
    color: colors.black,
  },

  joinText: {
    color: colors.primaryBlue1,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default styles;