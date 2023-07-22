import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TextEditor from './components/TextEditor';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TextEditor" component={TextEditor} options={{ title: 'Text Editor' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
