import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const TestScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { title, questions } = params as { [key: string]: any };

  const [currentQuestions, setCurrentQuestions] = useState<{ question: string; options: string[] }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [skippedQuestions, setSkippedQuestions] = useState<number[]>([]);

  useEffect(() => {
    if (questions) {
      try {
        const parsedQuestions = typeof questions === 'string' ? JSON.parse(JSON.parse(questions)) : questions;

        if (Array.isArray(parsedQuestions)) {
          setCurrentQuestions(parsedQuestions);
        } else {
          console.error('Parsed questions is not an array:', parsedQuestions);
        }
      } catch (error) {
        console.error('Error parsing questions:', error);
      }
    }
  }, [questions]);

  const handleAnswer = (index: number, answer: number) => {
    setAnswers(prev => ({ ...prev, [index]: answer }));
  };

  const skipQuestion = () => {
    setSkippedQuestions(prev => [...prev, currentIndex]);
    setCurrentIndex(prev => prev + 1);
  };

  const handleNavigation = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSubmit = () => {
    router.replace(
      `/test/ResultScreen?test=${encodeURIComponent(JSON.stringify({ questions: currentQuestions }))}&answers=${encodeURIComponent(JSON.stringify(answers))}`
    );
  };
  

  if (currentQuestions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg font-medium text-gray-700">Loading...</Text>
      </View>
    );
  }

  const isLastQuestion = currentIndex === currentQuestions.length - 1;
  const currentQuestion: { question: string; options: string[] } = currentQuestions[currentIndex];

  return (
    <View className="p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-blue-700 text-center mb-4">{title}</Text>
      <ScrollView
        horizontal
        className="flex-row mb-4 px-2"
        showsHorizontalScrollIndicator={false}
      >
        {currentQuestions.map((_, index) => (
          <TouchableOpacity
            key={index}
            className={`items-center justify-center p-3 w-14 h-14 mx-2 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onPress={() => handleNavigation(index)}
          >
            <Text
              className={`text-xl ${
                index === currentIndex ? 'text-white' : 'text-gray-700'
              }`}
            >
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className='h-1 w-full bg-gray-300 mb-3'></View>
      <Text className="text-2xl text-black mb-4 text-center">{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, i) => (
        <TouchableOpacity
          key={i}
          className={`p-4 rounded-lg my-2 ${
            answers[currentIndex] === i ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          onPress={() => handleAnswer(currentIndex, i)}
        >
          <Text
            className={`text-lg ${
              answers[currentIndex] === i ? 'text-white' : 'text-gray-700'
            }`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
      <View className="flex-row justify-between mt-6">
        <TouchableOpacity
          className={`px-6 py-3 rounded-lg ${
            currentIndex === 0 ? 'bg-gray-400' : 'bg-blue-500'
          }`}
          onPress={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
        >
          <Text className="text-white text-base font-semibold">Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-6 py-3 rounded-lg"
          onPress={skipQuestion}
        >
          <Text className="text-blue-500 text-base font-semibold">Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-6 py-3 bg-blue-500 rounded-lg"
          onPress={() => (isLastQuestion ? handleSubmit() : setCurrentIndex(prev => prev + 1))}
        >
          <Text className="text-white text-base font-semibold">
            {isLastQuestion ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TestScreen;
