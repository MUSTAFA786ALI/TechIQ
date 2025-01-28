// // store/quizAtom.ts
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { atomWithStorage } from 'jotai/utils';

// interface Question {
//   question: string;
//   options: string[];
//   correctOption: number;
// }

// interface Quiz {
//   title: string;
//   description: string;
//   time: string;
//   date: string;
//   duration: string;
//   questions: Question[];
// }

// // Define storage wrapper for AsyncStorage
// // const asyncStorage = {
// //   getItem: async (key: string) => {
// //     const value = await AsyncStorage.getItem(key);
// //     return value ? JSON.parse(value) : null;
// //   },
// //   setItem: async (key: string, value: any) => {
// //     await AsyncStorage.setItem(key, JSON.stringify(value));
// //   },
// //   removeItem: async (key: string) => {
// //     await AsyncStorage.removeItem(key);
// //   },
// // };

// const asyncStorage = {
//   getItem: async (key: string) => {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       return value; // Ensure the value is returned
//     } catch (error) {
//       console.error(`Error getting item ${key} from AsyncStorage:`, error);
//       return null;
//     }
//   },
//   setItem: async (key: string, value: any) => {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error(`Error setting item ${key} to AsyncStorage:`, error);
//     }
//   },
//   removeItem: async (key: string) => {
//     try {
//       await AsyncStorage.removeItem(key);
//     } catch (error) {
//       console.error(`Error removing item ${key} from AsyncStorage:`, error);
//     }
//   },
// };

// // Create persistent atom
// export const quizzesAtom = atomWithStorage<Quiz[]>('quizzes', [], asyncStorage);

// store/quizAtom.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage } from 'jotai/utils';

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

// Define storage wrapper for AsyncStorage
const asyncStorage = {
  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null; // parse the value for typed data
    } catch (error) {
      console.error(`Error getting item ${key} from AsyncStorage:`, error);
      return null;
    }
  },
  setItem: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} to AsyncStorage:`, error);
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from AsyncStorage:`, error);
    }
  },
};

// Create persistent atom
export const quizzesAtom = atomWithStorage<Quiz[]>('quizzes', [], asyncStorage);