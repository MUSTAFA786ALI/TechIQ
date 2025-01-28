import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const Index = ({ navigation }: { navigation: any }) => {
  return (
    <View className="flex-1 bg-black justify-center items-center pb-10  w-full h-full">
      {/* Gradient Text Effect */}
      {/* <LinearGradient
        colors={['#1E40AF', '#14B8A6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-1 justify-between items-center pb-10 pt-20 w-full h-full"
      > */}
        <View className="flex-1 justify-center items-center">
        {/* Logo */}
        <Image
          source={require('@/assets/images/brain.png')}
          className="w-32 h-32"
        />
        <Text className="text-6xl font-extrabold text-white">
          TechIQ
        </Text>

        {/* Tagline */}
        <Text className="text-white text-2xl text-center mt-2 mb-6">
        Comprehensive Quiz Management App for Smart Learning
        </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          className="items-center justify-center w-[90%] h-16 bg-[#3B82F6] rounded-xl shadow-md"
          onPress={() => router.navigate('/auth/signIn')}
          >
          <Text className="text-white text-xl font-semibold text-center">Get Started</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Index;