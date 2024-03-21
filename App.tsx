
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

const Stack = createStackNavigator();


function Details() {
  const [burgerQuantity, setBurgerQuantity] = useState(0);
  const [friesQuantity, setFriesQuantity] = useState(0);
  const burgerPrice = 5; // Assuming the price of a burger is $5
  const friesPrice = 3; // Assuming the price of fries is $3

  const handleAddBurger = () => {
    setBurgerQuantity(burgerQuantity + 1);
  };

  const handleAddFries = () => {
    setFriesQuantity(friesQuantity + 1);
  };

  const totalPrice = burgerQuantity * burgerPrice + friesQuantity * friesPrice;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleAddBurger}>
        <ImageBackground
          source={{
            uri:
              'https://www.foodandwine.com/thmb/jldKZBYIoXJWXodRE9ut87K8Mag=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg',
          }}
          style={{ height: 50, width: 50 }}
        >
          <Text>Burger</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddFries}>
        <ImageBackground
          source={{
            uri:
              'https://www.foodandwine.com/thmb/jldKZBYIoXJWXodRE9ut87K8Mag=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg',
          }}
          style={{ height: 50, width: 50 }}
        >
          <Text>Fries</Text>
        </ImageBackground>
      </TouchableOpacity>
      <Text>Burger quantity: {burgerQuantity}</Text>
      <Text>Fries quantity: {friesQuantity}</Text>
      <Text>Total Price: ${totalPrice}</Text>
    </View>
  );
}



const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Stack.Navigator initialRouteName="Bluetooth" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bluetooth" component={BluetoothScreen} />
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="DiningLocation" component={DiningLocation} />
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="MainMenuItem" component={MainMenuItem} />
        <Stack.Screen name="ChoosenMeal" component={ChoosenMeals} />
        <Stack.Screen name="Detail" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default App;
