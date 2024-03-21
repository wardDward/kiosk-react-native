import {View, Text,useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import fries1 from '../assets/fries/fries1.png';
import fries2 from '../assets/fries/fries2.png';
import fries3 from '../assets/fries/fries3.png';
import fries4 from '../assets/fries/fries4.png';
import fries5 from '../assets/fries/fries5.png';
import fries6 from '../assets/fries/fries6.png';
const Meals = ({navigation}) => {
  const {height, width} = useWindowDimensions();

  const data = [
    {
      id: 1,
      name: 'fries',
      image: fries1,
    },
    {
      id: 2,
      name: 'fries',
      image: fries2,
    },
    {
      id: 3,
      name: 'fries',
      image: fries3,
    },
    {
      id: 4,
      name: 'fries',
      image: fries4,
    },
    {
      id: 5,
      name: 'fries',
      image: fries5,
    },
    {
      id: 6,
      name: 'fries',
      image: fries6,
    }
  ]
  return (
    <>
    {data.map(item => (
      <TouchableOpacity
        onPress={() => navigation.navigate('ChoosenMeal')}
        style={{
          width: width * 0.32,
          height: height / 4,
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 7,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <Image source={item.image} style={{height:150, width:150}}/>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    ))}
  </>
  );
};

const Fries = ({navigation}) => {
  return (
    <View
      style={{
        paddingVertical: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
      }}>
      <Meals navigation={navigation} />
    </View>
  );
};

export default Fries;
