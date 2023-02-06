import {StyleSheet} from 'react-native';

import {FontWeight} from '../../theme';

export default StyleSheet.create({
  item: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontWeight: FontWeight.SEMI_BOLD,
  },
});
