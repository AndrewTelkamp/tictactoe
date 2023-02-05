import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  board: {
    flex: 1,
    maxHeight: '50%',
    marginBottom: 24,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressText: {
    fontSize: 20,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  screen: {
    backgroudColor: 'green',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
