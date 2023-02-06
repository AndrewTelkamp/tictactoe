import {StyleSheet} from 'react-native';

import {Color, FontWeight} from '../../theme';

export default StyleSheet.create({
  borderBottom: {
    borderBottomColor: Color.BLACK,
  },
  borderRight: {
    borderRightColor: Color.BLACK,
  },
  square: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderLeftColor: Color.BLACK,
    borderTopColor: Color.BLACK,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: FontWeight.EXTRA_BOLD,
  },
});
