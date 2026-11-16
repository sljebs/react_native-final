import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CartScreen from './src/screens/CartScreen';
import CameraScreen from './src/screens/CameraScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#163D2D' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { color: '#FFFFFF', fontFamily: 'Arial', fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#F3F6F1' },
        }}
      >
        {user == null ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'მთავარი' }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'დეტალები' }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'კალათა' }} />
            <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'კამერა' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}