import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const TestDetailsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { title, description, duration, date, starttime, questions, completed } = params as { [key: string]: string };

  const guidelines = [
    "Read all questions carefully.",
    "Manage your time effectively.",
    "Do not use any external help.",
    "Ensure a stable internet connection.",
    "Submit your answers before the time ends."
  ];

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

  const handleStartTest = () => {
    if (completed) {
      router.push({
        pathname: '/test/ResultScreen',
        params: { title, description, duration, date, starttime, questions: JSON.stringify(questions) },
      });
    } else {
      router.push({
        pathname: '/test/TestScreen',
        params: { title, description, duration, date, starttime, questions: JSON.stringify(questions) },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View className='items-center p-4 rounded-xl bg-slate-100'>
        <Text className='text-center text-3xl'>Test Details</Text>
        <View className='h-1 w-full bg-slate-500'></View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>Description: {description}</Text>
        <Text style={styles.duration}>Duration: {duration} mins</Text>
        <Text style={styles.date}>{formatDate(date as string, starttime as string)}</Text>
      </View>
      <Text style={styles.guidelinesTitle}>Test Guidelines:</Text>
      {guidelines.map((guideline, index) => (
        <Text key={index} style={styles.guideline}>{index + 1}. {guideline}</Text>
      ))}

      <Button title="Start Now" onPress={handleStartTest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 16, marginBottom: 8 },
  duration: { fontSize: 14, marginBottom: 8 },
  date: { fontSize: 14, marginBottom: 24 },
  guidelinesTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  guideline: { fontSize: 16, marginBottom: 4 },
});

export default TestDetailsScreen;