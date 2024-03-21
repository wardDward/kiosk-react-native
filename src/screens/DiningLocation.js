import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

const DiningLocation = ({navigation}) => {
  const {height, width} = useWindowDimensions();
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
          onPress={() => navigation.navigate('MainMenu')}
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
                height: 180,
                width: 180,
                marginTop: 40,
                borderRadius: 100,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainMenu')}
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
                height: 180,
                width: 180,
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
