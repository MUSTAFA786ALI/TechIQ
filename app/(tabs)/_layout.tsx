import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const tabBarStyle = Platform.select({
    ios: {
      height: 80,
      paddingBottom: 20,
      paddingTop: 5,
    },
    android: {
      height: 65,
      paddingBottom: 10,
      paddingTop: 5,
    },
  });

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: tabBarStyle, // Fixed tab bar style
        tabBarActiveTintColor: '#3B82F6',
        tabBarLabelStyle: {
          fontFamily: 'SourceSansPro_700Bold',
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={30}
              color={focused ? '#3B82F6' : '#555555'}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name= "Quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              size={30}
              color={focused ? '#3B82F6' : '#555555'}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={30}
              color={focused ? '#3B82F6' : '#555555'}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}