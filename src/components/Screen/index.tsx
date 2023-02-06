import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';

import styles from './styles';

import type {PropsWithChildren} from 'react';
import type {ScrollViewProps, ViewStyle} from 'react-native';

export interface ScreenProps extends ContentProps {}

export function Screen(props: PropsWithChildren<ScreenProps>) {
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <Content {...props} />
    </SafeAreaView>
  );
}

export interface ContentProps extends ScrollViewProps {
  children: any;
  isNotPadded?: boolean;
  isScrollIndicatorVisible?: boolean;
  onRefresh?: () => void;
  refreshing?: false;
  style?: ViewStyle;
}

function Content({
  children,
  isNotPadded,
  isScrollIndicatorVisible,
  onRefresh,
  refreshing = false,
  style = {},
  ...props
}: ContentProps) {
  return (
    <ScrollView
      {...props}
      bounces={!!onRefresh}
      contentContainerStyle={[
        styles.contentContainer,
        isNotPadded && styles.notPadded,
        {...style},
      ]}
      showsVerticalScrollIndicator={isScrollIndicatorVisible}
      refreshControl={
        <RefreshControl
          enabled={!!onRefresh}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      style={styles.scrollview}>
      {children}
    </ScrollView>
  );
}

export default Screen;
