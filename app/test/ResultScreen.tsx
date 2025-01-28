import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { quizzesAtom } from '../Atom';

const ResultScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);

  const test = params.test ? JSON.parse(params.test as string) : { questions: [] };
  const answers = params.answers ? JSON.parse(params.answers as string) : [];

  const correctAnswers = test.questions.reduce(
    (count: number, q: any, index: number) => (q.correctOption === answers[index] ? count + 1 : count),
    0
  );

  const markTestAsCompleted = () => {
    const updatedQuizzes = quizzes.map(quiz => {
      if (quiz.title === test.title) {
        return { ...quiz, completed: true };
      }
      return quiz;
    });
    setQuizzes(updatedQuizzes);
  };

  useEffect(() => {
    markTestAsCompleted();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white p-4 rounded-xl shadow-white">
      <Text className="text-4xl font-bold text-center mb-6">Test Results</Text>
      <Text className="text-2xl text-center mb-6">
        Score: {correctAnswers} / {test.questions.length}
      </Text>
      <View className="flex-row justify-center">
        <Button title="Go Back Home" onPress={() => router.replace('/(tabs)/Quiz')} />
      </View>
    </View>
  );
};

export default ResultScreen;
