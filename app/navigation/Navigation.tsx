import * as React from 'react';
import { StyleSheet } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

// import Portfolio from 'screens/portfolio/Portfolio';
import Onboarding from '@screens/onboarding/Onboarding';
import Login from '@screens/authentication/Login';
import Register from '@screens/authentication/Register';
// import Investments from '@screens/portfolio/investments/Investments';
// import SecurityOverview from 'screens/portfolio/Overview';

// import Explore from '@screens/explore/Explore';
import Account from '@screens/account/Account';
import Lessons from 'screens/lessons/Index';

import Lesson from 'screens/lessons/learn/Index';
import LessonComplete from 'screens/lessons/learn/Complete';

import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Home, User, DollarSign, BarChart2} from 'react-native-feather';
import { Theme } from 'styles/Index';

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
    <SafeAreaView style={styles.bottomTabContainer} edges={['top']}>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="none"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 58 + insets.bottom,
          },
          tabBarLabelStyle: {
            marginBottom: 5,
            ...Theme.typography.text.tabBarFooter,
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
          tabBarBadgeStyle: {
            ...Theme.typography.text.h6,
            ...Theme.typography.weight.normal,
            color: Theme.colors.white,
            backgroundColor: Theme.colors.purple,
          },
          tabBarActiveTintColor: Theme.colors.purple,
        }}>
        <Tab.Screen
          name="Home"
          component={Lessons}
          options={{
            tabBarIcon: ({color, size}) => (
              <Home
                stroke={color}
                fill={Theme.colors.transparent}
                width={iconSize}
                height={iconSize}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Portfolio"
          component={Portfolio}
          options={{
            title: 'Earn',
            tabBarBadge: '9+',
            tabBarIcon: ({color, size}) => (
              <DollarSign
                stroke={color}
                fill={Theme.colors.transparent}
                width={iconSize}
                height={iconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            title: 'Rankings',
            tabBarIcon: ({color, size}) => (
              <BarChart2
                stroke={color}
                fill={Theme.colors.transparent}
                width={iconSize}
                height={iconSize}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({color, size}) => (
              <User
                stroke={color}
                fill={Theme.colors.transparent}
                width={iconSize}
                height={iconSize}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const RootNavigation = (props: StateProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={props.authenticated ? "Tabs" : props.onboarded ? "Login" : "Onboarding"}
        screenOptions={{
          // animation: "fade",
          headerTitleStyle: {
            ...Theme.typography.text.tabBarHeader,
          },
        }}>
        {props.authenticated ? (
          <>
            {/* <Stack.Screen 
              name="Investments" 
              component={Investments}
            />
            <Stack.Screen 
              name="SecurityOverview" 
              component={SecurityOverview} 
            /> */}
            <Stack.Screen 
              name="Lesson" 
              component={Lesson}
              options={{ headerShown: false }}
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
              name="Tabs"
              component={Tabs}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerTitle: 'Getting Started' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    flex: 1,
  },
});


export default RootNavigation;
