import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import TestCard from '@/app/TestCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { quizzesAtom } from '../Atom';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

interface Quiz {
  title: string;
  description: string;
  time: string;
  date: string;
  duration: string;
  questions: Question[];
  completed?: boolean;
}

export default function Quiz() {
  const [selectedButton, setSelectedButton] = useState('Ongoing tests');
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);

  useEffect(() => {
    console.log('Quizzes:', quizzes);
  }, [quizzes]);

  const getQuizStartTime = (item: Quiz) => {
    const datePart = new Date(item.date);
    const timePart = new Date(item.time);
    datePart.setHours(timePart.getHours());
    datePart.setMinutes(timePart.getMinutes());
    datePart.setSeconds(timePart.getSeconds());
    return datePart;
  };

  const filterQuizzes = (quizzesList: Quiz[]) => {
    const now = new Date();
    return quizzesList.filter((item) => {
      const startTime = getQuizStartTime(item);
      const durationMinutes = parseInt(item.duration, 10) || 0;
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + durationMinutes);

      if (selectedButton === 'Ongoing tests') {
        return startTime <= now && now < endTime;
      } else if (selectedButton === 'Upcoming test') {
        return startTime > now;
      } else {
        return now >= endTime;
      }
    });
  };

  const renderContent = () => {
    if (!quizzes || quizzes.length === 0) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No quizzes available.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filterQuizzes(quizzes)}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => {
          // Determine the buttonText based on the selected filter
          let buttonText: string | undefined;

          if (selectedButton === 'Ongoing tests') {
            buttonText = 'Start Test';
          } else if (selectedButton === 'Ended test') {
            buttonText = 'View';
          } else {
            buttonText = undefined; // No button for Upcoming tests
          }

          return (
            <TestCard
              title={item.title}
              description={item.description}
              buttonText={buttonText ?? ''}
              duration={item.duration}
              date={item.date}
              starttime={item.time}
              questions={item.questions}  
              completed={item.completed}
            />
          );
        }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
      />
    );
  };

  return (
    <SafeAreaView className="bg-gray-100 relative">
      {/* Header */}
      <View className="flex-row items-center justify-start bg-[#3B82F6] mb-5 p-2 pl-5 pr-3">
        <TouchableOpacity onPress={() => console.log('Navigate to Profile')}>
          <Image
            source={require('@/assets/images/profile.png')}
            className="w-12 h-12 rounded-full"
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white pl-5 flex-1">Quiz</Text>
        <Ionicons name="notifications" size={28} color="white" />
      </View>

      {/* Welcome Banner */}
      <View className="items-center justify-center w-[92%] h-48 bg-[#F97316] rounded-lg p-4 shadow-md mb-4 self-center">
        <Text className="text-white text-2xl font-bold text-center">
          Welcome to Your Quizzes!
        </Text>
        <Text className="text-white text-base mt-2 text-center mb-2">
          Keep track of your ongoing, upcoming, and completed tests.
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/CreateTest')}
          className="flex-row w-28 h-12 bg-white rounded-3xl justify-center items-center shadow-xl"
        >
          <Ionicons name="add" size={28} color="#3B82F6" />
          <Text className="text-[#3B82F6] text-lg text-center font-semibold">Create</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2 pl-3">
        <View className="flex-row items-center justify-between pr-5">
          {['Ongoing tests', 'Upcoming test', 'Ended test'].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`py-2 px-4 rounded-3xl mx-2 ${
                selectedButton === tab ? 'bg-[#3B82F6]' : 'bg-white'
              }`}
              onPress={() => setSelectedButton(tab)}
            >
              <Text
                className={`font-sans ${
                  selectedButton === tab ? 'text-white' : 'text-black'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Content */}
    {renderContent()}
    </SafeAreaView>
  );
}