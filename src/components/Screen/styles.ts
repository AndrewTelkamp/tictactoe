import {StyleSheet} from 'react-native';

import {Color} from '../../theme';

export default StyleSheet.create({
  centeredScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: Color.WHITE,
    flexDirection: 'column',
    minHeight: '100%',
    maxWidth: '100%',
    padding: 16,
  },
  list: {
    backgroundColor: Color.LIGHT_GRAY,
  },
  notPadded: {
    padding: 0,
  },
  footer: {
    height: 200,
    width: '100%',
  },
  scrollview: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: Color.WHITE,
    flex: 1,
  },
});
