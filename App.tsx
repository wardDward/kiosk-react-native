
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Pressable, StatusBar, TouchableOpacity, ImageBackground, SafeAreaView, Image, } from 'react-native';
import { useState } from 'react';
import BluetoothScreen from './src/screens/BluetoothScreen';
import OnBoardScreen from './src/screens/OnBoardScreen';
import DiningLocation from './src/screens/DiningLocation';
import MainMenu from './src/screens/MainMenu';
import MainMenuItem from './src/screens/MainMenuItem';
import ChoosenMeals from './src/screens/ChoosenMeals';
import { Provider } from 'react-redux';
import store from './src/store/store';
import ViewOrder from './src/screens/ViewOrder';
import CashierBoard from './src/screens/cashier/CashierBoard';
import KioskOrder from './src/screens/cashier/KioskOrder';
import CashierChoosenMeals from './src/screens/cashier/CashierChoosenMeals';
import CashierViewOrder from './src/screens/cashier/CashierViewOrder';
import QueueScreen from './src/screens/QueueScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator initialRouteName="Bluetooth" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Bluetooth" component={BluetoothScreen} />
          <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="DiningLocation" component={DiningLocation} />
          <Stack.Screen name="MainMenu" component={MainMenu} />
          <Stack.Screen name="MainMenuItem" component={MainMenuItem} />
          <Stack.Screen name="ChoosenMeal" component={ChoosenMeals} />
          <Stack.Screen name="ViewOrder" component={ViewOrder} />
          <Stack.Screen name="CashierBoard" component={CashierBoard} />
          <Stack.Screen name="CashierChoosenMeals" component={CashierChoosenMeals} />
          <Stack.Screen name="KioskOrder" component={KioskOrder} />
          <Stack.Screen name="CashierViewOrder" component={CashierViewOrder} />
          <Stack.Screen name="QueueScreen" component={QueueScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
};


export default App;
