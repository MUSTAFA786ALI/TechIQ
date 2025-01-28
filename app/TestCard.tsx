import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

interface TestCardProps {
  title: string;
  description: string;
  buttonText?: string;
  duration: string;
  date: string;
  starttime: string;
  questions?: Question[];
  completed?: boolean;
}

const TestCard: React.FC<TestCardProps> = ({
  title,
  description,
  buttonText,
  duration,
  date,
  starttime,
  questions,
  completed,
}) => {
  const router = useRouter();

  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const day = date.getDate();
    const ordinal = (d: number) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };
    const month = date.toLocaleString('default', { month: 'short' });
    const time = new Date(timeStr).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${day}${ordinal(day)} of ${month} at ${time}`;
  };

  const handlePress = () => {
    if (completed) {
      router.push({
        pathname: '/test/ResultScreen',
        params: { title, description, duration, date, starttime, questions: JSON.stringify(questions) },
      });
    } else if (buttonText === 'Start Test') {
      router.push({
        pathname: '/test/TestDetailsScreen',
        params: { title, description, duration, date, starttime, questions: JSON.stringify(questions) },
      });
    }
  };

  return (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <View>
          <Text className="text-gray-900 text-xl font-semibold">{title}</Text>
          <Text className="text-gray-600 text-base mt-2">{description}</Text>
        </View>
        {duration && (
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={20} color="#3B82F6" />
            <Text className="ml-1 text-gray-700">{duration} mins</Text>
          </View>
        )}
      </View>
      <Text className="text-gray-600">{formatDate(date, starttime)}</Text>

      {buttonText ? (
        <TouchableOpacity
          onPress={handlePress}
          className="mt-4 w-full h-10 bg-[#3B82F6] rounded-lg justify-center items-center"
        >
          <Text className="text-white text-lg font-semibold">{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default TestCard;