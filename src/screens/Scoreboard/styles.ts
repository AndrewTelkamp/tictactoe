import {StyleSheet} from 'react-native';

import {Color, FontWeight} from '../../theme';

export default StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyStateText: {
    color: Color.LIGHT_GRAY,
    fontSize: 20,
  },
  firstColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  rankRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
  },
  rowHeader: {
    color: Color.PRIMARY,
  },
  text: {
    fontSize: 22,
    fontWeight: FontWeight.SEMI_BOLD,
  },
});
