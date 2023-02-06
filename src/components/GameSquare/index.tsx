import {memo, useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {Color, FontWeight} from '../../theme';

interface GameSquareProps {
  hasRightBorder?: boolean;
  hasBottomBorder?: boolean;
  onPress?: () => void;
  playerNumber?: number;
}

function GameSquare({
  hasRightBorder,
  hasBottomBorder,
  onPress,
  playerNumber,
}: GameSquareProps) {
  const [height, setHeight] = useState(100);

  let text;
  if (playerNumber) {
    text = playerNumber === 1 ? 'X' : '0';
  }

  function handleLayout(e: any) {
    const {layout} = e.nativeEvent;
    setHeight(Math.floor(layout.width));
  }

  return (
    <Pressable
      {...{onPress}}
      onLayout={handleLayout}
      style={[
        styles.square,
        hasBottomBorder && styles.borderBottom,
        hasRightBorder && styles.borderRight,
        {height, width: height},
      ]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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

export default memo(GameSquare);
