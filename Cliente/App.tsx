import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/navigation/stack/StackNavigator';

export default function App() {
  return (
     <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

