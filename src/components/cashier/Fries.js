import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import friesImage1 from '../../assets/fries/fries1.png';
import friesImage2 from '../../assets/fries/fries2.png';
import friesImage3 from '../../assets/fries/fries3.png';
import friesImage4 from '../../assets/fries/fries4.png';
import friesImage5 from '../../assets/fries/fries5.png';
import friesImage6 from '../../assets/fries/fries6.png';



const imageMap = {
  '../assets/fries/fries1.png': friesImage1,
  '../assets/fries/fries2.png': friesImage2,
  '../assets/fries/fries3.png': friesImage3,
  '../assets/fries/fries4.png': friesImage4,
  '../assets/fries/fries5.png': friesImage5,
  '../assets/fries/fries6.png': friesImage6,
};

const Meals = ({navigation, frie}) => {
  const {height, width} = useWindowDimensions();

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('CashierChoosenMeals', frie)}
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
          source={imageMap[frie.image_path]}
          style={{height: 130, width: 130}}
        />
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          {frie.item_name}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const Fries = ({navigation, fries}) => {
  return (
    <View
      style={{
        paddingVertical: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
      }}>
      {fries.map(frie => (
        <Meals key={frie.id} navigation={navigation} frie={frie} />
      ))}
    </View>
  );
};

export default Fries;
