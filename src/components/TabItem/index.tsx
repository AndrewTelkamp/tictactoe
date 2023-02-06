import React, {memo} from 'react';
import {Pressable, Text} from 'react-native';

import {Color} from '../../theme';
import styles from './styles';

interface TabItemProps {
  icon: JSX.Element;
  isFocused: boolean;
  label: string;
  size?: number;
  theirProps: {
    accessibilityState: {
      selected?: boolean;
    };
    onPress: () => void;
  };
}

const TabItem = ({icon, label, theirProps}: TabItemProps) => {
  function handlePress() {
    theirProps.onPress();
  }

  const color = theirProps.accessibilityState.selected
    ? Color.SECONDARY
    : Color.LIGHT_GRAY;

  return (
    <Pressable onPress={handlePress} style={styles.item}>
      {icon}
      <Text style={[styles.text, {color}]}>{label}</Text>
    </Pressable>
  );
};

export default memo(TabItem);
