import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {diningStyle} from '../store/features/orderSlice';

const DiningLocation = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch();

  const chooseType = style => {
    dispatch(diningStyle(style)); // Dispatch the diningStyle action
  };

  const dineIn = () => {
    chooseType('Dine-in');
    navigation.navigate('MainMenu');
  };

  const takeOut = () => {
    chooseType('take-out');
    navigation.navigate('MainMenu');
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <Image
        source={require('../assets/dining-burger.png')}
        style={{height: 200, width: 300}}
      />
      <Text
        style={{fontSize: 25, color: 'white', marginBottom: 20, marginTop: 10}}>
        Choose Dining Style
      </Text>
      <View style={{flexDirection: 'row', gap: 4}}>
        <TouchableOpacity
          onPress={() => dineIn()}
          style={{
            backgroundColor: 'white',
            height: height / 3,
            width: width * 0.45,
            borderRadius: 10,
            padding: 5,
            alignItems: 'center ',
          }}>
          <Text style={{textAlign: 'center', fontSize: 20}}>Dine-In</Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/dining-burger1.jpg')}
              style={{
                height: height * 0.2,
                width: width * 0.4,
                marginTop: 40,
                borderRadius: 100,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => takeOut()}
          style={{
            backgroundColor: 'white',
            height: height / 3,
            width: width * 0.45,
            borderRadius: 10,
            padding: 5,
            alignItems: 'center ',
          }}>
          <Text style={{textAlign: 'center', fontSize: 20}}>Take-Out</Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/dining-fries.jpg')}
              style={{
                height: height * 0.2,
                width: width * 0.4,
                marginTop: 40,
                borderRadius: 100,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DiningLocation;
