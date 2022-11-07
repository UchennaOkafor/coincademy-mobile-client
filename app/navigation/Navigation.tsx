import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Onboarding from '@screens/onboarding/Onboarding';
import Login from '@screens/authentication/Login';
import Register from '@screens/authentication/Register';

import Profile from 'screens/profile/Profile';
import Lessons from 'screens/lessons/Index';

import Lesson from 'screens/lessons/learn/Index';
import LessonComplete from 'screens/lessons/learn/Complete';

import Settings from 'screens/settings/Settings';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Book, Home as House, TrendingUp, User} from 'react-native-feather';
import {Theme} from 'styles/Index';
import LoginAlt from 'screens/authentication/LoginAlt';
import Empty from 'screens/Empty';
import Discover from 'screens/discover/Index';
import ProjectOverview from 'screens/project/Overview';
import CategoryListings from 'screens/discover/CategoryListings';
import Onboarding2 from 'screens/onboarding/Onboarding2';
import Welcome from 'screens/onboarding/Welcome';
import Home from 'screens/home/Index';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface StateProps {
  onboarded: boolean;
  authenticated: boolean;
  authToken: string;
}

const Tabs = () => {
  const insets = useSafeAreaInsets();
  const iconSize = 19;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 57 + insets.bottom
        },
        tabBarLabelStyle: {
          marginBottom: 7,
          ...Theme.typography.text.tabBarFooter
        },
        tabBarIconStyle: {
          marginTop: 5
        },
        tabBarBadgeStyle: {
          ...Theme.typography.text.h6,
          ...Theme.typography.weight.normal,
          color: Theme.colors.white,
          backgroundColor: Theme.colors.purple
        },
        tabBarActiveTintColor: Theme.colors.purple
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <House
              stroke={color}
              fill={Theme.colors.transparent}
              width={iconSize}
              height={iconSize}
            />
          )
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TrendingUp
              stroke={color}
              fill={Theme.colors.transparent}
              width={iconSize}
              height={iconSize}
            />
          )
        }}
      />
      <Tab.Screen
        name="Learn"
        component={Lessons}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Book
              stroke={color}
              fill={Theme.colors.transparent}
              width={iconSize}
              height={iconSize}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <User
              stroke={color}
              fill={Theme.colors.transparent}
              width={iconSize}
              height={iconSize}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigation = (props: StateProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={props.authenticated ? "Tabs" : props.onboarded ? "Login" : "Welcome"}
        screenOptions={{
          // animation: "fade",
          headerTitleStyle: {
            ...Theme.typography.text.tabBarHeader
          }
        }}>
        {props.authenticated ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Lesson"
              component={Lesson}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="LessonComplete"
              component={LessonComplete}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="ProjectOverview"
              component={ProjectOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CategoryListings"
              component={CategoryListings}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerShown: true,
                gestureEnabled: true
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Onboarding"
              component={Onboarding2}
              options={{
                headerShown: false,
                gestureEnabled: false
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerTitle: 'Create an account'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    flex: 1
  }
});

export default RootNavigation;
