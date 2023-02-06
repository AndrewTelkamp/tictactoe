import {StyleSheet} from 'react-native';

import {Color} from '../../theme';

export default StyleSheet.create({
  knob: {
    backgroundColor: 'white',
    height: 36,
    width: 36,
    borderRadius: 24,
  },
  enabled: {
    backgroundColor: Color.PRIMARY,
    justifyContent: 'flex-end',
  },
  track: {
    backgroundColor: Color.LIGHT_GRAY,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    height: 40,
    borderRadius: 25,
    paddingRight: 2,
    paddingLeft: 2,
  },
});
