import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import React from 'react';

const Meals = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChoosenMeal')}
      style={{
        width: width * 0.35,
        height: height / 4,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 7,
        overflow: 'hidden',
      }}>
      <Text>sdasds</Text>
    </TouchableOpacity>
  );
};

const MainMenuItem = ({navigation}) => {
  return (
      <View style={{justifyContent:'center',flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
        <Meals navigation={navigation} />
        <Meals navigation={navigation} />
        <Meals navigation={navigation} />
        <Meals navigation={navigation} />
        <Meals navigation={navigation} />
    </View>
  );
};

export default MainMenuItem;
