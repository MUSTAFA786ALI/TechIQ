import { View, Text, StatusBar, Image, NativeSyntheticEvent, TextLayoutEventData, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

export default function Profile() {

  const [isTruncated, setIsTruncated] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (e.nativeEvent.lines.length > 6) {
      setIsTruncated(true);
    }
  };

  return (
    <View className="flex-1 items-center bg-white pt-5">
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      <View className="flex-row w-[95%] items-center justify-center bg-white rounded-xl shadow-[#3464fc] shadow-xl mb-2 p-5">
        <Image
          source={require('@/assets/images/profile.png')}
          className="w-28 h-28 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-3xl font-bold text-black pl-5">Syed Mustafa Ali</Text>
          <Text className="text-lg text-black pl-5">Btech - CSE</Text>
          <Text className="text-lg text-justify text-black pl-5">Sreyas Institute of Engineering and Technology</Text>
        </View>
      </View>
      <View className="flex-col w-[95%] justify-start bg-white rounded-xl shadow-[#3464fc] shadow-xl mb-2 p-2">
        <Text className="text-2xl font-bold text-black pl-3 mt-2">About Me</Text>
        <View className='h-0.5 bg-gray-500 w-full mb-5 mt-2'></View>
        <Text className="text-lg text-black text-justify pl-3 pr-3"
        onTextLayout={handleTextLayout}
        numberOfLines={expanded ? undefined : 6}
        >
          I am a student of Btech - CSE at Sreyas Institute of Engineering and Technology and an aspiring Software developer with a strong foundation in Kotlin programming and a genuine enthusiasm for crafting user-centric mobile applications. Eager to deepen my understanding of Data Structures and Algorithms, I bring prior experience in web development and a steadfast commitment to continuous learning. Additionally, I am keen on exploring the fascinating intersections of mobile technology and Artificial Intelligence/Machine Learning (AI/ML), I am poised to contribute my evolving skills to dynamic projects, aspiring to make impactful strides in the evolving realm of Artificial Intelligence/Machine Learning in mobile technology.</Text>
          {isTruncated && (
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            className="flex-row justify-center items-center mt-1"
        >
            <Text className="text-[#3464fc]">{expanded ? "Show Less" : "Show More"}</Text>
            <FontAwesome
            name={expanded ? "angle-up" : "angle-down"}
            size={20}
            color="#3464fc"
            style={{ marginLeft: 4 }}
            />
        </TouchableOpacity>
        )}
      </View>
    </View>
  )
}