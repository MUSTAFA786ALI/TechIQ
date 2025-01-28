import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAtom } from 'jotai';
import { quizzesAtom } from './Atom';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
}

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [quizTime, setQuizTime] = useState<Date | null>(null); // Stores the selected time
  const [quizTimeDisplay, setQuizTimeDisplay] = useState('');
  const [quizDuration, setQuizDuration] = useState(''); // Duration in minutes
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: ['', '', '', ''], correctOption: 0 },
  ]);
  const [quizzes, setQuizzes] = useAtom(quizzesAtom);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [quizDate, setQuizDate] = useState<Date | null>(null);
  const [quizDateDisplay, setQuizDateDisplay] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const dateStr = `${month}/${day}/${year}`;
    setQuizDate(selectedDate);
    setQuizDateDisplay(dateStr);
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleTimeConfirm = (time: Date) => {
    // Format the selected time to a user-friendly string
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const formattedTime = `${twelveHour}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    setQuizTime(time);
    setQuizTimeDisplay(formattedTime);
    hideTimePicker();
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctOption: 0 },
    ]);
  };

  const handleCreateQuiz = () => {
    // Validate required fields
    if (
      !quizTitle ||
      !quizDescription ||
      !quizTime ||
      !quizDate ||
      !quizDuration
    ) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    // Ensure quizzes is an array
    const updatedQuizzes = Array.isArray(quizzes) ? [...quizzes] : [];

    const newQuiz: Quiz = {
      title: quizTitle,
      description: quizDescription,
      time: quizTime.toISOString(), // Convert to ISO string
      date: quizDate.toISOString(),
      duration: quizDuration,
      questions,
    };

    setQuizzes([...updatedQuizzes, newQuiz]); // Add the new quiz to the global state
    console.log('Quiz added to global state:', newQuiz);
    Alert.alert('Success', 'Quiz created successfully!');
    router.back(); // Navigate back to the dashboard or another screen
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Title Input */}
      <Text className="text-xl font-semibold text-gray-800 mb-2">Quiz Title</Text>
      <TextInput
        className="w-full h-12 p-3 mb-4 border border-gray-300 rounded-lg"
        placeholder="Enter quiz title"
        value={quizTitle}
        onChangeText={setQuizTitle}
      />

      {/* Description Input */}
      <Text className="text-xl font-semibold text-gray-800 mb-2">Quiz Description</Text>
      <TextInput
        className="w-full h-12 p-3 mb-4 border border-gray-300 rounded-lg"
        placeholder="Enter quiz description"
        value={quizDescription}
        onChangeText={setQuizDescription}
      />

      {/* Quiz Date */}
      <Text className="text-xl font-semibold text-gray-800 mb-2">Quiz Date</Text>
      <View className="flex-1 pr-1">
        <TextInput
          className="w-full h-12 p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Select Quiz Date"
          value={quizDateDisplay || ''}
          editable={false}
        />
        <TouchableOpacity
          onPress={showDatePicker}
          className="mb-2 pl-2"
          style={{ position: 'absolute', right: 13, top: 20 }}
        >
          <Ionicons name="chevron-down-sharp" size={24} color="#3464fc" />
        </TouchableOpacity>
      </View>

      {/* Time Picker */}
      <Text className="text-xl font-semibold text-gray-800 mb-2">Quiz Time</Text>
      <View className="flex-1 pr-1">
        <TextInput
          className="w-full h-12 p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Select Start Time"
          value={quizTimeDisplay || ''}
          editable={false}
        />
        <TouchableOpacity
          onPress={showTimePicker}
          className="mb-2 pl-2"
          style={{ position: 'absolute', right: 13, top: 20 }}
        >
          <Ionicons name="chevron-down-sharp" size={24} color="#3464fc" />
        </TouchableOpacity>
      </View>

      {/* Duration Input */}
      <Text className="text-xl font-semibold text-gray-800 mb-2">Quiz Duration (in minutes)</Text>
      <TextInput
        className="w-full h-12 p-3 mb-4 border border-gray-300 rounded-lg"
        placeholder="Enter duration in minutes"
        value={quizDuration}
        onChangeText={setQuizDuration}
        keyboardType="numeric"
      />

      {/* Questions Section */}
      <Text className="text-xl font-semibold text-gray-800 mb-4">Questions</Text>
      {questions.map((q, index) => (
        <View key={index} className="bg-white rounded-lg p-4 mb-4 shadow-md">
          <Text className="text-gray-800 mb-2">Question {index + 1}</Text>
          <TextInput
            className="w-full h-12 p-3 mb-4 border border-gray-300 rounded-lg"
            placeholder="Enter question"
            value={q.question}
            onChangeText={(text) =>
              setQuestions(
                questions.map((item, i) =>
                  i === index ? { ...item, question: text } : item
                )
              )
            }
          />
          {q.options.map((option, optIndex) => (
            <TextInput
              key={optIndex}
              className="w-full h-12 p-3 mb-2 border border-gray-300 rounded-lg"
              placeholder={`Option ${optIndex + 1}`}
              value={option}
              onChangeText={(text) =>
                setQuestions(
                  questions.map((item, i) =>
                    i === index
                      ? {
                          ...item,
                          options: item.options.map((opt, oIndex) =>
                            oIndex === optIndex ? text : opt
                          ),
                        }
                      : item
                  )
                )
              }
            />
          ))}
          <TextInput
            className="w-full h-12 p-3 mb-2 border border-gray-300 rounded-lg"
            placeholder="Correct Option (1-4)"
            value={q.correctOption > 0 ? (q.correctOption + 1).toString() : ''}
            onChangeText={(text) =>
              setQuestions(
                questions.map((item, i) =>
                  i === index
                    ? {
                        ...item,
                        correctOption: text ? parseInt(text) - 1 : 0,
                      }
                    : item
                )
              )
            }
            keyboardType="numeric"
          />
        </View>
      ))}

      {/* Add Question Button */}
      <TouchableOpacity
        className="w-full h-12 bg-[#3B82F6] rounded-lg justify-center items-center mb-4"
        onPress={addQuestion}
      >
        <Text className="text-white text-lg font-semibold">Add Question</Text>
      </TouchableOpacity>

      {/* Create Quiz Button */}
      <TouchableOpacity
        className="w-full h-12 bg-[#14B8A6] rounded-lg justify-center items-center"
        onPress={handleCreateQuiz}
      >
        <Text className="text-white text-lg font-semibold">Create Quiz</Text>
      </TouchableOpacity>
      <View className="h-12"></View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        is24Hour={false}
      />
    </ScrollView>
  );
};

export default CreateQuiz;