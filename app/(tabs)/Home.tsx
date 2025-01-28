import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';

const Home = ({ navigation }: { navigation: any }) => {
  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      {/* Header */}
      <View className="flex-row items-center justify-start bg-[#3B82F6] mb-2 p-2 pl-5 pr-3">
         <TouchableOpacity
          onPress={() => console.log('Navigate to Profile')}
        >
          {/* Replace with the user avatar image */}
          <Image 
            source={require('@/assets/images/profile.png')} 
            className="w-12 h-12 rounded-full" 
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white pl-5 pr-36">Welcome, Syed!</Text>
        <Ionicons name="notifications" size={28} color="white" />
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-4 py-6">
        {/* Example Feature Cards */}
        <View className="bg-white rounded-lg shadow-md p-4 mb-4">
          <Text className="text-gray-800 text-lg font-semibold">Feature 1</Text>
          <Text className="text-gray-600 text-sm mt-2">
            Description of Feature 1 goes here.
          </Text>
        </View>
        <View className="bg-white rounded-lg shadow-md p-4 mb-4">
          <Text className="text-gray-800 text-lg font-semibold">Feature 2</Text>
          <Text className="text-gray-600 text-sm mt-2">
            Description of Feature 2 goes here.
          </Text>
        </View>
        <View className="bg-white rounded-lg shadow-md p-4 mb-4">
          <Text className="text-gray-800 text-lg font-semibold">Feature 3</Text>
          <Text className="text-gray-600 text-sm mt-2">
            Description of Feature 3 goes here.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
