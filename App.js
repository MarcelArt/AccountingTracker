import React from 'react';
import 'react-native-get-random-values'
import HomeView from './views/HomeView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
