import {memo, useState} from 'react';
import {Pressable, Text} from 'react-native';

import styles from './styles';

interface GameSquareProps {
  hasBottomBorder?: boolean;
  hasRightBorder?: boolean;
  onPress?: () => void;
  playerNumber?: number;
}

function GameSquare({
  hasBottomBorder,
  hasRightBorder,
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

export default memo(GameSquare);
