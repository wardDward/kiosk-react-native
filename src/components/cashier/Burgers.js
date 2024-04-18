import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import burger1 from '../../assets/burgers/burger1.png';
import burger2 from '../../assets/burgers/burger2.png';
import burger3 from '../../assets/burgers/burger3.png';
import burger4 from '../../assets/burgers/burger4.png';
import burger5 from '../../assets/burgers/burger5.png';
import burger6 from '../../assets/burgers/burger6.png';
import burger7 from '../../assets/burgers/burger7.png';


const imageMap = {
  '../assets/burgers/burgers1.png': burger1,
  '../assets/burgers/burgers2.png': burger2,
  '../assets/burgers/burger3.png': burger3,
  '../assets/burgers/burger4.png': burger4,
  '../assets/burgers/burger5.png': burger5,
  '../assets/burgers/burger6.png': burger6,
  '../assets/burgers/burger7.png': burger7,

};

const Meals = ({navigation, burger}) => {
  const {height, width} = useWindowDimensions();
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('CashierChoosenMeals', burger)}
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
          source={imageMap[burger.image_path]}
          style={{height: 130, width: 130}} />
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {burger.item_name}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const Burgers = ({navigation, burgers}) => {
  return (
    <View
      style={{
        paddingVertical: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
      }}>
      {burgers.map(burger => (
        <Meals key={burger.id} navigation={navigation} burger={burger} />
      ))}
    </View>
  );
};

export default Burgers;
