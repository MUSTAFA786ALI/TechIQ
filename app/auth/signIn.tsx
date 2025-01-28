import { router } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { FirebaseError } from 'firebase/app';
import auth from '@react-native-firebase/auth';

const SignIn = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const signIn = async () => {
		setLoading(true);
		try {
			await auth().signInWithEmailAndPassword(email, password);
		} catch (e: any) {
			const err = e as FirebaseError;
			alert('Sign in failed: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
    <View className="flex-1 items-center bg-black p-4">
      <View className='flex-row justify-start items-center pt-5 pb-52'>
        <Image
          source={require('@/assets/images/brain.png')}
          className="w-16 h-16"
        />
        <Text className="text-3xl font-extrabold text-white">TechIQ</Text>
      </View>
      <View className="w-[90%] h-[40%] justify-center items-center rounded-xl border border-white">
      <Text className="text-2xl font-bold text-white mb-6">Sign In</Text>
      
      <TextInput
        className="w-[90%] h-12 p-3 mb-4 text-white border rounded-lg border-gray-300"
        placeholder="Email"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        className="w-[90%] h-12 p-3 mb-6 border text-white rounded-lg border-gray-300"
        placeholder="Password"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={password}
      secureTextEntry
            />
            
            <TouchableOpacity
              className="w-[90%] h-16 bg-[#3B82F6] rounded-xl shadow-md justify-center items-center"
              onPress={signIn}
            >
              <Text className="text-white text-xl font-semibold">Sign In</Text>
        <Text className="text-white text-xl font-semibold">Sign In</Text>
      </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
