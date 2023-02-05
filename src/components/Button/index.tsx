import {memo} from 'react';
import {Pressable, Text} from 'react-native';

import styles from './styles';

import type {PressableProps, ViewStyle} from 'react-native';

export interface ButtonProps extends PressableProps {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onPress: () => void;
  title: string;
  style?: ViewStyle;
}

function Button({
  leftIcon,
  onPress,
  rightIcon,
  style,
  title,
  ...props
}: ButtonProps) {
  return (
    <Pressable {...props} {...{onPress}} style={[styles.button, {...style}]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export default memo(Button);
