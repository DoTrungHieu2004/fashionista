import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TAB_ROUTES, TabStackParamList } from './routes';
import CustomTabBar from '../components/CustomTabBar';

import PlaceholderScreen from '../screens/placeholder/PlaceholderScreen';
import HomeScreen from '../screens/main/HomeScreen';
import MallScreen from '../screens/main/MallScreen';

const Tab = createBottomTabNavigator<TabStackParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name={TAB_ROUTES.HOME}>{() => <HomeScreen />}</Tab.Screen>
      <Tab.Screen name={TAB_ROUTES.MALL}>{() => <MallScreen />}</Tab.Screen>
      <Tab.Screen name={TAB_ROUTES.WISHLIST}>
        {() => <PlaceholderScreen title="Curated Wishlist" iconName="heart" />}
      </Tab.Screen>
      <Tab.Screen name={TAB_ROUTES.ORDERS}>
        {() => <PlaceholderScreen title="Track Orders" iconName="package" />}
      </Tab.Screen>
      <Tab.Screen name={TAB_ROUTES.PROFILE}>
        {() => <PlaceholderScreen title="Boutique Profile" iconName="user" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTabs;
