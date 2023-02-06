import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TabItem} from '../components';
import {RouteName} from '../enums';
import {Color} from '../theme';

import GameScreen from '../screens/Game';
import SettingsScreen from '../screens/Settings';
import ScoreboardScreen from '../screens/Scoreboard';

const Tab = createBottomTabNavigator();

const ACTIVE_TINT_COLOR = Color.PRIMARY;
const INACTIVE_TINT_COLOR = Color.LIGHT_GRAY;

const defaultConfig = {
  headerShown: false,
  tabBarActiveTintColor: ACTIVE_TINT_COLOR,
  tabBarInactiveTintColor: INACTIVE_TINT_COLOR,
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        detachInactiveScreens={true}
        screenOptions={{
          tabBarStyle: {height: 75},
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          component={GameScreen}
          name={RouteName.GAME}
          options={{
            ...defaultConfig,
            tabBarButton: (props: any) => (
              <TabItem
                isFocused={props.focused}
                // icon={}
                label={RouteName.GAME}
                theirProps={props}
              />
            ),
          }}
        />

        <Tab.Screen
          component={ScoreboardScreen}
          name={RouteName.SCOREBOARD}
          options={{
            ...defaultConfig,
            tabBarButton: (props: any) => (
              <TabItem
                isFocused={props.focused}
                // icon={}
                label={RouteName.SCOREBOARD}
                theirProps={props}
              />
            ),
          }}
        />

        <Tab.Screen
          component={SettingsScreen}
          name={RouteName.SETTINGS}
          options={{
            ...defaultConfig,
            tabBarButton: (props: any) => (
              <TabItem
                isFocused={props.focused}
                // icon={}
                label={RouteName.SETTINGS}
                theirProps={props}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
