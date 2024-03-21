import {View, Text, useWindowDimensions, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import drinks1 from '../assets/drinks/drinks1.png';
import drinks2 from '../assets/drinks/drinks2.png';
import drinks3 from '../assets/drinks/drinks3.png';
const Meals = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const data = [
    {
      id: 1,
      name: 'drinks',
      image: drinks1,
    },
    {
      id: 2,
      name: 'drinks',
      image: drinks2,
    },
    {
      id: 3,
      name: 'drinks',
      image: drinks3,
    },
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

const Drinks = ({navigation}) => {
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

export default Drinks;
