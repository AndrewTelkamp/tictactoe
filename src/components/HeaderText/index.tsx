import {memo} from 'react';
import {Text as RNText} from 'react-native';

import styles from './styles';

import type {TextProps as RNTextProps, TextStyle} from 'react-native';

export interface TextProps extends RNTextProps {
  children: string;
  color?: string;
  style?: TextStyle;
}

export const HeaderText = ({children, style, ...props}: TextProps) => {
  return (
    <RNText {...props} style={styles.text}>
      {children}
    </RNText>
  );
};

export default memo(HeaderText);
