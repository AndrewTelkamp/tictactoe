import React, {memo} from 'react';
import {Pressable, View, Text} from 'react-native';

import styles from './styles';

// import {IconName} from '../../enums';
import {Color, FontWeight} from '../../theme';
// import Icon from '../Icon';
// import Text from '../Text';

interface TabItemProps {
  // icon: IconName;
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

const TabItem = ({label, size = 24, theirProps}: TabItemProps) => {
  function handlePress() {
    theirProps.onPress();
  }

  const color = theirProps.accessibilityState.selected
    ? Color.PRIMARY
    : Color.LIGHT_GRAY;

  return (
    <Pressable onPress={handlePress} style={styles.item}>
      {/* <Icon color={color} name={icon} onPress={handlePress} size={size} /> */}
      <Text style={[styles.text, {color}]}>{label}</Text>
    </Pressable>
  );
};

export default memo(TabItem);
