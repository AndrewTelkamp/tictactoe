import {memo} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface GameSquareProps {
  onPress?: () => void;
  playerNumber?: number;
}

function GameSquare({onPress, playerNumber}: GameSquareProps) {
  let text;
  if (playerNumber) {
    text = playerNumber === 1 ? 'X' : '0';
  }

  return (
    <Pressable {...{onPress}} style={styles.square}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  square: {
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: 'center',
    flex: 1,
    minHeight: 100,
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
  },
});

export default memo(GameSquare);
