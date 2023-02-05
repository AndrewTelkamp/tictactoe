import React, {memo} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, View} from 'react-native';

import styles from './styles';

import type {PropsWithChildren} from 'react';
import type {ScrollViewProps, ViewStyle} from 'react-native';

export interface ScreenProps extends ContentProps {}

export function Screen({style, ...props}: PropsWithChildren<ScreenProps>) {
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <Content {...props} />
    </SafeAreaView>
  );
}

export interface ContentProps extends ScrollViewProps {
  children: any;
  isNotPadded?: boolean;
  isSafeArea?: boolean;
  isScrollIndicatorVisible?: boolean;
  onRefresh?: () => void;
  refreshing?: false;
}

function Content({
  children,
  onRefresh,
  keyboardShouldPersistTaps,
  isScrollIndicatorVisible,
  isNotPadded,
  refreshing = false,
  ...props
}: ContentProps) {
  return (
    <ScrollView
      {...props}
      bounces={!!onRefresh}
      contentContainerStyle={[
        styles.contentContainer,
        isNotPadded && styles.notPadded,
      ]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
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

export default memo(Screen);
