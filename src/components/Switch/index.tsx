import React, {memo} from 'react';
import {Pressable, View} from 'react-native';

import styles from './styles';

interface SwitchProps {
  onChange: () => void;
  isEnabled: boolean;
}

const Switch = ({onChange, isEnabled}: SwitchProps) => {
  return (
    <Pressable
      onPress={onChange}
      style={[styles.track, isEnabled && styles.enabled]}>
      <View style={styles.knob} />
    </Pressable>
  );
};

export default memo(Switch);
