import {StyleSheet} from 'react-native';

import {Color, FontWeight} from '../../theme';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: Color.PRIMARY,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
  },
  text: {
    color: Color.WHITE,
    fontWeight: FontWeight.BOLD,
    fontSize: 18,
  },
});
