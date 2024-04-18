import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import pizza1 from '../../assets/pizza/pizza1.png';
import pizza2 from '../../assets/pizza/pizza2.png';
import pizza3 from '../../assets/pizza/pizza3.png';
import pizza4 from '../../assets/pizza/pizza4.png';

const imageMap = {
  '../assets/pizza/pizza1.png': pizza1,
  '../assets/pizza/pizza2.png': pizza2,
  '../assets/pizza/pizza3.png': pizza3,
  '../assets/pizza/pizza4.png': pizza4,
};

const Meals = ({navigation, pizza}) => {
  const {height, width} = useWindowDimensions();
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('CashierChoosenMeals', pizza)}
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
        <Image
          source={imageMap[pizza.image_path]}
          style={{height: 120, width: 110}}
        />
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {pizza.item_name}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const Pizzas = ({navigation, pizzas}) => {
  return (
    <View
      style={{
        paddingVertical: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
      }}>
      {pizzas.map(pizza => (
        <Meals key={pizza.id} navigation={navigation} pizza={pizza} />
      ))}
    </View>
  );
};

export default Pizzas;
