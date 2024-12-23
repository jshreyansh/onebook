import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import OTPScreen from '../screens/OTPScreen';
import FlashCardsScreen from '../screens/FlashCardsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isLoggedIn, currentUser, logout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#1a1a1a',
          }
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen 
            name="FlashCards" 
            component={FlashCardsScreen}
            options={{ 
              title: `${currentUser?.name}'s Flash Cards`,
              headerRight: () => (
                <TouchableOpacity 
                  onPress={logout}
                  style={{ marginRight: 10 }}
                >
                  <Text style={{ color: '#007AFF' }}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
        ) : (
          <>
            <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator; 