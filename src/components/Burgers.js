import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import burger1 from '../assets/burgers/burger1.png';
import burger2 from '../assets/burgers/burger2.png';
import burger3 from '../assets/burgers/burger3.png';
import burger4 from '../assets/burgers/burger4.png';
import burger5 from '../assets/burgers/burger5.png';
import burger6 from '../assets/burgers/burger6.png';
const Meals = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const data = [
    {
      id: 1,
      name: 'burger',
      image: burger1,
    },
    {
      id: 2,
      name: 'burger',
      image: burger2,
    },
    {
      id: 3,
      name: 'burger',
      image: burger3,
    },
    {
      id: 4,
      name: 'burger',
      image: burger4,
    },
    {
      id: 5,
      name: 'burger',
      image: burger5,
    },
    {
      id: 6,
      name: 'burger',
      image: burger6,
    },
  ];

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

const Burgers = ({navigation}) => {
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

export default Burgers;
